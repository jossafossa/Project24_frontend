import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeboardRoutingModule } from './noticeboard-routing.module';
import { BoardComponent } from './board/board.component';
import {MatCardModule, MatGridListModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    NoticeboardRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule
  ]
})
export class NoticeboardModule { }
