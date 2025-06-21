import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    standalone: true
})
export class AuthenticationComponent {

  public CSHARP: string = `services.AddSingleton<IConfiguration>(Configuration);`;
  public WEBCONFIG: string = ` <connectionStrings>
    <add name="CONNEXION_NAME" connectionString="Data Source=DATABASE_ADRESS;Initial Catalog=DATABASE_NAME;" />
  </connectionStrings>`;

  constructor() {
 
  }
}
