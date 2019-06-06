// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule} from '@auth0/angular-jwt';
import { HttpClientModule} from '@angular/common/http';
import { AccountService } from './account.service';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
// import { Ng5SliderModule } from 'ng5-slider';
// import { Angular2ImageGalleryModule } from 'angular2-image-gallery'
// import { ReactiveFormsModule} from '@angular/forms';

export function tokenGetter(){
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    // Ng5SliderModule,
    // Angular2ImageGalleryModule,
    // ReactiveFormsModule,
    // BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
