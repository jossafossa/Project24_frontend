import { NgModule } from '@angular/core';
// import { HubComponent } from './hub/hub.component';
import { SwipeComponent } from './swipe.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
	  	path: '',
	  	component: SwipeComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwipeRoutingModule { }
