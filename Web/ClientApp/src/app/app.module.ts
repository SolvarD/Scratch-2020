import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/interceptor';
import { WeatherforecastService } from './services/weatherforecast.service';
import { HubRealtimeService } from './services/hub-realtime';
import { MessengerComponent } from './component/messenger/messenger.component';
import { UserService } from './services/user.service';
import { MultiLanguageComponent } from './component/multi-language/multi-language.component';
import { MessageService } from './services/message.service';
import { LanguageService } from './services/language.service';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { TranslationService } from './services/translation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { AppInitService } from './services/AppInit.service';
import { HomeComponent } from "./views/public/home/home.component";
import { ErrorComponent } from "./views/public/error/error.component";
import { DictionaryComponent } from "./views/admin/dictionary/dictionary.component";
import { AuthenticationComponent } from "./views/public/authentification/authentication.component";
import { MultiLanguageViewComponent } from "./views/public/multi-language/multi-language-view.component";
import { HostIISComponent } from "./views/public/host-iis/host-iis.component";
import { SignalRCodeComponent } from "./views/public/signalr-code/signalr-code.component";
import { CounterComponent } from "./views/public/counter/counter.component";
import { DataBaseComponent } from "./views/public/database/database.component";
import { UserComponent } from "./views/admin/users/user.component";
import { DisplayUserComponent } from './component/display-user/display-user.component';
import { RoleService } from './services/role.service';
import { ModalConfirmComponent } from './component/modal-confirm/modal-confirm.component';
import { SpinnerService } from './services/spinner.service';
import { ContactComponent } from './views/public/contact/contact.component';
import { ContactService } from './services/contact.service';
import { PorteFolioComponent } from './views/public/porte-folio/porte-folio.component';
import { ProfilComponent } from './views/public/profil/profil.component';
import { SkillsComponent } from './views/public/skills/skills.component';
import { PricesComponent } from './views/public/prices/prices.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SkillService } from './services/skill.service';
import { ExperienceService } from './services/experience.service';
import { AdminSkillsComponent } from './views/admin/skills/admin-skills.component';
import { AdminPorteFolioComponent } from './views/admin/porte-folio/admin-porte-folio.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DDLComponent } from './component/ddl-filter/ddl-filter.component';
import { InputDateComponent } from './component/input-date/input-date.component';
import { CacheService } from './services/Cache.service';
import { AdminProfilComponent } from './views/admin/profil/admin-profil.component';
registerLocaleData(localeFr, 'fr-FR');
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
    AuthenticationComponent,
    DictionaryComponent,
    DisplayUserComponent,
    ModalConfirmComponent,
    ContactComponent,
    PorteFolioComponent,
    ProfilComponent,
    SkillsComponent,
    PricesComponent,
    FilterPipe,
    AdminPorteFolioComponent,
    AdminSkillsComponent,
    DDLComponent,
    InputDateComponent,
    AdminProfilComponent
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
    }),
    CKEditorModule
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
    LanguageService,
    TranslationService,
    RoleService,
    SpinnerService,
    ContactService,
    SkillService,
    ExperienceService,
    DatePipe,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.API}/Dictionary`, "");
}
