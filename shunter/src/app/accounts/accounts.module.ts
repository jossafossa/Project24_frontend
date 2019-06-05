import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateComponent } from './create/create.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthInfoComponent } from './create/auth-info/auth-info.component';
import { BasicInfoComponent } from './create/basic-info/basic-info.component';
import {FileUploadModule} from 'ng2-file-upload';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [CreateComponent, AccountsComponent, AuthInfoComponent, BasicInfoComponent, EditComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FileUploadModule,
  ]
})
export class AccountsModule { }
//file upload werkt niet
