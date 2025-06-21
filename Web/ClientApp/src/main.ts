import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';

// Services
import { AppInitService } from './app/services/AppInit.service';
import { TranslationService } from './app/services/translation.service';
import { WeatherforecastService } from './app/services/weatherforecast.service';
import { HubRealtimeService } from './app/services/hub-realtime';
import { UserService } from './app/services/user.service';
import { MessageService } from './app/services/message.service';
import { LanguageService } from './app/services/language.service';
import { RoleService } from './app/services/role.service';
import { SpinnerService } from './app/services/spinner.service';
import { ContactService } from './app/services/contact.service';
import { SkillService } from './app/services/skill.service';
import { ExperienceService } from './app/services/experience.service';
import { CacheService } from './app/services/cache.service';
import { ProfileService } from './app/services/profile.service';
import { ToolsService } from './app/services/tools.service';
import { DocumentService } from './app/services/document.service';

// Interceptor
import { TokenInterceptor } from './app/services/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

registerLocaleData(localeFr, 'fr-FR');

// Initialisation de l'app
// export function appInitializerFactory() {
//   const appInitService = inject(AppInitService);
//   return () => appInitService.initializeApp();
// }

export function appInitializerFactory(
  userService: UserService,
  profileService: ProfileService
): () => Promise<any> {
  return () => AppInitService.initializeApp(userService, profileService);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(CKEditorModule, FormsModule, ReactiveFormsModule),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [UserService, ProfileService],
      multi: true
    },

    // provideAppInitializer(() => {
    //   const initializerFn = ((
    //     userService: UserService,
    //     profileService: ProfileService
    //   ) => () => AppInitService.initializeApp(userService,profileService))(inject(UserService), inject(ProfileService));
    //   return initializerFn();
    // }),

    // Intercepteur HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

    // Tous tes services
    DatePipe,
    TranslationService,
    AppInitService,
    WeatherforecastService,
    HubRealtimeService,
    UserService,
    MessageService,
    LanguageService,
    RoleService,
    SpinnerService,
    ContactService,
    SkillService,
    ExperienceService,
    CacheService,
    ProfileService,
    ToolsService,
    DocumentService,
  ]
}).catch(err => console.error(err));

