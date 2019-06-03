import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(mod => mod.AccountsModule)
  },
  {
    path: '',
    redirectTo: '/accounts/create',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
