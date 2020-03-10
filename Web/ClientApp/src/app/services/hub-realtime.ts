import { Injectable } from "@angular/core";
import * as SignalR from "@aspnet/signalr";

@Injectable({
  providedIn: "root"
})
export class HubRealtimeService {
  private hubConnection: SignalR.HubConnection;

  constructor() { }

  public Init() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44359/msgs`)
      .build();

    this.connect();


    this.hubConnection.on("public", (m) => console.log("message public", m))

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
