import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {ViewComponent} from './view/view.component';

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
      },
      {
        path: 'view',
        component: ViewComponent,
      },
      {
        path: 'swipe',
        loadChildren: () => import('./swipe/swipe.module').then(mod => mod.SwipeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
