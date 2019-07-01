import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeboardRoutingModule } from './noticeboard-routing.module';
import { BoardComponent } from './board/board.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatToolbarModule} from '@angular/material';
import { NoticeComponent } from './notice/notice.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BoardComponent, NoticeComponent],
  exports: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    NoticeboardRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class NoticeboardModule { }
