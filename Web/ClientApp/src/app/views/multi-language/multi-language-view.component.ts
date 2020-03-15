import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multi-language-view',
  templateUrl: './multi-language-view.component.html'
})
export class MultiLanguageViewComponent {

  public CSHARP: string = `  services.Configure<IISServerOptions>
    (options =>
    {
    options.AutomaticAuthentication = false;
    });`;
  public WEBCONFIG: string = `

with ngx-translate

npm install @ngx-translate/core @ngx-translate/http-loader -save`;

  constructor() {
 
  }
}
