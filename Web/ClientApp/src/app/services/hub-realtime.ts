import { Injectable } from "@angular/core";
import * as SignalR from "@aspnet/signalr";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HubRealtimeService {

  private hubConnection: SignalR.HubConnection;
  private publicMessage = new Subject<string>();
  public suscribePublicMessage = this.publicMessage.asObservable();

  constructor() { }

  public Init() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44359/msgs`)
      .build();

    this.connect();


    this.hubConnection.on("SendMessageToAll", (m) => {
      this.publicMessage.next(m);
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
}
