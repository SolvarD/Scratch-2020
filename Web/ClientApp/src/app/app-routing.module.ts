import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./views/home/home.component";
import { CounterComponent } from "./views/counter/counter.component";
import { AuthGuard } from "./services/auth.guard";
import { UserComponent } from "./views/users/user.component";
import { ErrorComponent } from "./views/error/error.component";
import { SignalRCodeComponent } from "./views/signalr-code/signalr-code.component";
import { DataBaseComponent } from "./views/database/database.component";
import { HostIISComponent } from "./views/host-iis/host-iis.component";
import { MultiLanguageViewComponent } from "./views/multi-language/multi-language-view.component";
import { AuthenticationComponent } from "./views/authentification/authentication.component";

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
    path: 'error/:id',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
