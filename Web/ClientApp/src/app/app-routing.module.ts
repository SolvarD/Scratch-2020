import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";
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
import { ContactComponent } from "./views/public/contact/contact.component";
import { PorteFolioComponent } from "./views/public/porte-folio/porte-folio.component";
import { ProfilComponent } from "./views/public/profil/profil.component";
import { SkillsComponent } from "./views/public/skills/skills.component";
import { PricesComponent } from "./views/public/prices/prices.component";
import { AdminSkillsComponent } from "./views/admin/skills/admin-skills.component";
import { AdminPorteFolioComponent } from "./views/admin/porte-folio/admin-porte-folio.component";
import { AdminProfilComponent } from "./views/admin/profil/admin-profil.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'signalr', component: SignalRCodeComponent },
  { path: 'database', component: DataBaseComponent },
  { path: 'host-iis', component: HostIISComponent },
  { path: 'multi-language', component: MultiLanguageViewComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'porte-folio', component: PorteFolioComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'prices', component: PricesComponent },
  {
    path: 'admin', children: [
      {
        path: 'users', component: UserComponent, canActivate: [AuthGuard]
      },
      {
        path: 'dictionary', component: DictionaryComponent, canActivate: [AuthGuard]
      },
      {
        path: 'skills', component: AdminSkillsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'porte-folio', component: AdminPorteFolioComponent, canActivate: [AuthGuard]
      },
      {
        path: 'profil', component: AdminProfilComponent, canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'error/:id',
    component: ErrorComponent
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
