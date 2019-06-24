import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './accounts/create/create.component';
import { TestComponent } from './test/test.component';
// import { SwipeRoutingModule, SwipeModule } from './swipe/swipe.module'; 

const routes: Routes = [ 
  {
    path: "",
    component: HomeComponent, 
  },
  {
    path: 'group-accounts',
    loadChildren: () => import('./group-accounts/group-accounts.module').then(mod => mod.GroupAccountsModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(mod => mod.AccountsModule),
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
    path: 'test',
    component: TestComponent,
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
