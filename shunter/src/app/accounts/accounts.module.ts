import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateComponent } from './create/create.component';
import { AccountsComponent } from './accounts/accounts.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditComponent } from './edit/edit.component';
import {SwipeModule} from './swipe/swipe.module';
import { InterestsModule } from '../interests/interests.module';

// import {Ng5SliderModule} from 'ng5-slider';
// import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [CreateComponent, AccountsComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule, 
    AccountsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    MatButtonModule,
    SwipeModule,
    InterestsModule,
    // Ng5SliderModule,
    // Angular2ImageGalleryModule,
  ]
})
export class AccountsModule { }
