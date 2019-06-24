import { NgModule, ModuleWithProviders  } from '@angular/core';
// import { AccountService } from './account.service';

@NgModule({

})
export class AccountServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountServiceModule,
    }
  }
}