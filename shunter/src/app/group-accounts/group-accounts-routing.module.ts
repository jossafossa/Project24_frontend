import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupAccountsComponent} from './group-accounts/group-accounts.component'
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {ViewComponent} from './view/view.component';

import {importExpr} from '@angular/compiler/src/output/output_ast';

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
      },     
      {
        path: 'view/:id',
        component: ViewComponent,
      },
      {
        path: 'board',
        loadChildren: () => import('./noticeboard/noticeboard.module').then(mod => mod.NoticeboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupAccountsRoutingModule { }
