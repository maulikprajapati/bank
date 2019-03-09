import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component imports
import { AppComponent } from './app.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlankLayoutComponent } from './containers/blank-layout/blank-layout.component';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { CommonService } from './shared/services/common.service';
import { AuthService } from './shared/services/auth.service';
import { HttpClientService } from './lib/http/http-client.service';
import { ResponseInterceptor } from './lib/http/response-interceptor';
import { SkipLoginGuard } from './guards/skip-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { NotificationService } from './shared/notification.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    BlankLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    routing,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CommonService,
    AuthService,
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    SkipLoginGuard,
    AuthGuard,
    AdminGuard,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
