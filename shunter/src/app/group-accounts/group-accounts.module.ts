import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';

import { GroupAccountsRoutingModule } from './group-accounts-routing.module';
import { CreateComponent } from './create/create.component';
import { GroupAccountsComponent } from './group-accounts/group-accounts.component';
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
  declarations: [CreateComponent, GroupAccountsComponent, BasicInfoComponent, EditComponent, InterestsComponent, PhotosComponent, ViewComponent],
  imports: [
    CommonModule,
    GroupAccountsRoutingModule,
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
export class GroupAccountsModule { }