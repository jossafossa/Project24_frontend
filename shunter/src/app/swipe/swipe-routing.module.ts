import { NgModule } from '@angular/core';
import { HubComponent } from './hub/hub.component';
import { GroupComponent } from './group/group.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'swipe',
  	component: HubComponent,
  },
	{
  	path: 'swipe/group',
  	component: GroupComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwipeRoutingModule { }
