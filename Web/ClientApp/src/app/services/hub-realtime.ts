import { Injectable } from "@angular/core";
import * as SignalR from "@microsoft/signalr";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { Message } from "../../models/message";

@Injectable({
  providedIn: "root"
})
export class HubRealtimeService {

  private hubConnection: SignalR.HubConnection;

  private publicMessage = new Subject<Message>();
  public suscribePublicMessage = this.publicMessage.asObservable();

  private countUser = new Subject<number>();
  public suscribeCountUser = this.countUser.asObservable();

  constructor() { }

  public Init() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${environment.API}/msgs`)
      .build();

    this.connect();


    this.hubConnection.on("SendMessageToAll", (m: Message) => {
      this.publicMessage.next(m);
    });

    this.hubConnection.on("SendNumberUser", (m: number) => {
      this.countUser.next(m);
    });

    this.hubConnection.onclose(e => {
      if (e) this.connect();
    });
  }

  public async connect() {
    try {
      await this.hubConnection.start();
      console.log("SignalR : Connected");
    } catch (e) {
      console.log("SignalR : Error happend", e);
      setTimeout(() => {
        console.log("SignalR : Reconnecting...");
        this.connect();
      }, 1000);
    }
  }

  public postMessage(message: Message) {
    this.hubConnection.send("SendMessageToAll", message);
  }
}
