import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { CounterComponent } from "./counter/counter.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guard/auth.guard";
import { UserComponent } from "./users/user.component";
import { ErrorComponent } from "./error/error.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
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
