import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-host-iis',
    templateUrl: './host-iis.component.html',
    standalone: false
})
export class HostIISComponent {

  public CSHARP: string = `  services.Configure<IISServerOptions>
    (options =>
    {
    options.AutomaticAuthentication = false;
    });`;
  public WEBCONFIG: string = ` <connectionStrings>
    <add name="CONNEXION_NAME" connectionString="Data Source=DATABASE_ADRESS;Initial Catalog=DATABASE_NAME;" />
  </connectionStrings>`;

  constructor() {
 
  }
}
