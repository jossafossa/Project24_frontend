import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardComponent} from './board/board.component';
import {CreateComponent} from '../create/create.component';
import {EditComponent} from '../edit/edit.component';
import {ViewComponent} from '../view/view.component';
import {NoticeComponent} from './notice/notice.component';


const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  },
  {
    path: 'board',
    component: BoardComponent,
  },
  {
    path: 'board/addnotice',
    component: NoticeComponent,
  },
  {
    path: 'board/notice/:id',
    component: NoticeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeboardRoutingModule {  }
