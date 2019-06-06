import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {CreateComponent} from './accounts/create/create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
	{
		path: 'accounts', 
		// component: HomeComponent,
    redirectTo: '/accounts',
    pathMatch: 'full'
	},
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'logout', 
    component: HomeComponent,
  },
  {
    path: 'signup', 
    component: HomeComponent,
  },
  {
    path: 'swipe',
    redirectTo: '/swipe',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
  	RouterModule.forRoot(
  		routes
  	)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
