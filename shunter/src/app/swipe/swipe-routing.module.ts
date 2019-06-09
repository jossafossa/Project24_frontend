import { NgModule } from '@angular/core';
import { HubComponent } from './hub/hub.component';
import { GroupComponent } from './group/group.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
    	component: HubComponent,
    	children: [
	    	{
	        	path: 'group',
	        	component: GroupComponent,
	      	},
	    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwipeRoutingModule { }
