import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwipeRoutingModule } from './swipe-routing.module';
import { GroupComponent } from './group/group.component';
import { HubComponent } from './hub/hub.component';
import { GroupDisplayComponent } from './group/group-display/group-display.component';

@NgModule({
  declarations: [GroupComponent, HubComponent, GroupDisplayComponent],
  imports: [
    CommonModule,
    SwipeRoutingModule
  ]
})
export class SwipeModule { }
