import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./views/home/home.component";
import { FetchDataComponent } from "./views/fetch-data/fetch-data.component";
import { CounterComponent } from "./views/counter/counter.component";
import { LoginComponent } from "./views/login/login.component";
import { AuthGuard } from "./services/auth.guard";
import { UserComponent } from "./views/users/user.component";
import { ErrorComponent } from "./views/error/error.component";
import { SignalRCodeComponent } from "./views/signalr-code/signalr-code.component";
import { DataBaseComponent } from "./views/database/database.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'signalr', component: SignalRCodeComponent },
  { path: 'database', component: DataBaseComponent },
  {
    path: 'admin',
    component: LoginComponent,
    children: [{
      path: 'users', component: UserComponent, canActivate: [AuthGuard]
    }]
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
