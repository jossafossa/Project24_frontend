import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateComponent } from './create/create.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthInfoComponent } from './helpers/auth-info/auth-info.component';
import { BasicInfoComponent } from './helpers/basic-info/basic-info.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditComponent } from './edit/edit.component';
import { InterestsComponent } from './helpers/interests/interests.component';
import { PhotosComponent } from './helpers/photos/photos.component';

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
    MatButtonModule,
    // Ng5SliderModule,
    // Angular2ImageGalleryModule,
  ]
})
export class AccountsModule { }
