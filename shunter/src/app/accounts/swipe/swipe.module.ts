import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwipeRoutingModule } from './swipe-routing.module';
import { SwipeComponent } from './swipe.component';
// import { HubComponent } from './/hub.component';
import { GroupDisplayComponent } from './group-display/group-display.component';

@NgModule({
  declarations: [SwipeComponent, GroupDisplayComponent],
  imports: [
    CommonModule,
    SwipeRoutingModule
  ]
})
export class SwipeModule { }
