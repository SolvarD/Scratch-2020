import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    standalone: true
})
export class DataBaseComponent {

  public CSHARP: string = `services.AddSingleton<IConfiguration>(Configuration);`;
  public WEBCONFIG: string = ` <connectionStrings>
    <add name="CONNEXION_NAME" connectionString="Data Source=DATABASE_ADRESS;Initial Catalog=DATABASE_NAME;" />
  </connectionStrings>`;

  constructor() {
 
  }
}
