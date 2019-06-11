import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupAccountsComponent} from './group-accounts/group-accounts.component'
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: GroupAccountsComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      },
      {
        path: 'view',
        component: ViewComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupAccountsRoutingModule { }
