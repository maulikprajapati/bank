import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonAuthRouting } from './non-auth.routing';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { NonAuthService } from './non-auth.service';

@NgModule({
  imports: [
    CommonModule,
    NonAuthRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService,
    NonAuthService
  ]
})
export class NonAuthModule { }
