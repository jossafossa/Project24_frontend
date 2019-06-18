// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule} from '@auth0/angular-jwt';
import { HttpClientModule} from '@angular/common/http';
import { AccountService, APIService } from './account.service';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';

import { SwipeModule } from './swipe/swipe.module';
import { TestComponent } from './test/test.component';

import {SlideshowModule} from 'ng-simple-slideshow';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

export function tokenGetter(){
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    TestComponent
  ],
  imports: [
    SlideshowModule,
    BrowserAnimationsModule,
    SwipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [AccountService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
