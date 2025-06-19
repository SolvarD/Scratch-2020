import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-signalr-code',
    templateUrl: './signalr-code.component.html',
    standalone: false
})
export class SignalRCodeComponent {

  public CSHARP: string = `
  services.AddCors(options =>
      {
        options.AddPolicy("AllowOriginsPolicy",
        builder =>
          {
          builder.WithOrigins("https://localhost:44359","https://localhost:44303");
          builder.AllowAnyHeader();
          builder.AllowAnyMethod();
          builder.AllowCredentials();
          });
      });

      ....

      app.UseRouting();
      //under app.UseRouting()
      app.UseCors("AllowOriginsPolicy");

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapHub<RealTimeHub>("/WEBSOCKET_NAME");
      });`;
  public JS: string = `
      import { Injectable } from "@angular/core";
      import * as SignalR from "@microsoft/signalr";
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
          .withUrl('https://ROUTE/WEBSOCKET_NAME')
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

    public postMessage(message: string) {
        this.hubConnection.send("SendMessageToAll", message);
    }


  app.module

  FormsModule,
  ReactiveFormsModule,

  messenger.component

  constructor(private ref: ChangeDetectorRef)
  this.ref.detectChanges();


  formMessenger: FormGroup;
  this.formMessenger = this._fb.group({
  messageToSend: ["", [Validators.required]]
  });
    `;

  constructor() {
 
  }
}
