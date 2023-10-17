import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [UserService]},
  {path: 'home', component: HomeComponent , canActivate: [AuthService]},
  {path: 'signup', component: SignupComponent, canActivate: [UserService]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
