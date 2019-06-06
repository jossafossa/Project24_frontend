import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateComponent } from './create/create.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthInfoComponent } from './create/auth-info/auth-info.component';
import { BasicInfoComponent } from './create/basic-info/basic-info.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditComponent } from './edit/edit.component';
import { InterestsComponent } from './create/interests/interests.component';
import { PhotosComponent } from './create/photos/photos.component';

// import {Ng5SliderModule} from 'ng5-slider';
// import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [CreateComponent, AccountsComponent, AuthInfoComponent, BasicInfoComponent, EditComponent, InterestsComponent, PhotosComponent, ViewComponent],
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
    // Ng5SliderModule,
    // Angular2ImageGalleryModule,
  ]
})
export class AccountsModule { }
