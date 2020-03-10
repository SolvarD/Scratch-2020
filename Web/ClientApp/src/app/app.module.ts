import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './users/user.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptor } from './services/interceptor';
import { weatherforecastService } from './services/weatherforecast.service';
import { HubRealtimeService } from './services/hub-realtime';
import { MessengerComponent } from './component/messenger/messenger.component';

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
    MessengerComponent
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
    weatherforecastService,
    HubRealtimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
