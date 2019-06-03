import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
