import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {CreateComponent} from './accounts/create/create.component';
// import { SwipeRoutingModule, SwipeModule } from './swipe/swipe.module'; 

const routes: Routes = [ 
  {
    path: 'swipe',
    loadChildren: () => import('./swipe/swipe.module').then(mod => mod.SwipeModule)
  },
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
