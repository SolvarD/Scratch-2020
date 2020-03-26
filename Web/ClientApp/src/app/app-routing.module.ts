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
import { UserComponent } from "./views/Admin/users/user.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'signalr', component: SignalRCodeComponent },
  { path: 'database', component: DataBaseComponent },
  { path: 'host-iis', component: HostIISComponent },
  { path: 'multi-language', component: MultiLanguageViewComponent },
  { path: 'authentication', component: AuthenticationComponent },
  {
    path: 'users', component: UserComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dictionary', component: DictionaryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'error/:id',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
