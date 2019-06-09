import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {CreateComponent} from './accounts/create/create.component';

const routes: Routes = [
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(mod => mod.AccountsModule),
  },
  {
    path: 'group-accounts',
    loadChildren: () => import('./group-accounts/group-accounts.module').then(mod => mod.GroupAccountsModule),
  },
	{
		path: '', 
		component: HomeComponent,
	},
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'logout', 
    component: HomeComponent,
  },
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
