import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeboardRoutingModule } from './noticeboard-routing.module';
import { BoardComponent } from './board/board.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule} from '@angular/material';
import { NoticeComponent } from './notice/notice.component';

@NgModule({
  declarations: [BoardComponent, NoticeComponent],
  imports: [
    CommonModule,
    NoticeboardRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class NoticeboardModule { }
