import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { HomeComponent } from './views/home/home.component';
import { CounterComponent } from './views/counter/counter.component';
import { FetchDataComponent } from './views/fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    UserComponent,
    ErrorComponent,
    MessengerComponent,
    SignalRCodeComponent,
    DataBaseComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
    WeatherforecastService,
    HubRealtimeService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
