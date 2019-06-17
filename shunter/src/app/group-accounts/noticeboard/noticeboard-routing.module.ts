import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardComponent} from './board/board.component';
import {CreateComponent} from '../create/create.component';
import {EditComponent} from '../edit/edit.component';
import {ViewComponent} from '../view/view.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeboardRoutingModule {  }
