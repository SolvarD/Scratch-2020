import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { HomeComponent } from './views/home/home.component';
import { CounterComponent } from './views/counter/counter.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './views/users/user.component';
import { ErrorComponent } from './views/error/error.component';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/interceptor';
import { WeatherforecastService } from './services/weatherforecast.service';
import { HubRealtimeService } from './services/hub-realtime';
import { MessengerComponent } from './component/messenger/messenger.component';
import { SignalRCodeComponent } from './views/signalr-code/signalr-code.component';
import { UserService } from './services/user.service';
import { DataBaseComponent } from './views/database/database.component';
import { HostIISComponent } from './views/host-iis/host-iis.component';
import { MultiLanguageComponent } from './component/multi-language/multi-language.component';
import { MessageService } from './services/message.service';
import { LanguageService } from './services/language.service';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { TranslationService } from './services/translation.service';
import { MultiLanguageViewComponent } from './views/multi-language/multi-language-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationComponent } from './views/authentification/authentication.component';
import { AppInitService } from './services/AppInit.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    UserComponent,
    ErrorComponent,
    MessengerComponent,
    SignalRCodeComponent,
    DataBaseComponent,
    HostIISComponent,
    MultiLanguageComponent,
    MultiLanguageViewComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationService,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  },
    AppInitService,
    {
      provide: APP_INITIALIZER, useFactory: (appInitService: AppInitService) => {
        return () => appInitService.initializeApp();
      }, deps: [AppInitService], multi: true
    },
    WeatherforecastService,
    HubRealtimeService,
    UserService,
    MessageService,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.API}/Dictionnary`, "");
}
