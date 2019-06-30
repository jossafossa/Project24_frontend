import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestsComponent } from './interests.component';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [InterestsComponent],
  imports: [
    CommonModule,
    MatListModule
  ],
  exports: [InterestsComponent]
})
export class InterestsModule { }
