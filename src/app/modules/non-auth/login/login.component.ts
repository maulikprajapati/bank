import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from './login.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: Login = new Login();
  error: string;
  isLoading: boolean;
  tenants: [];

  constructor(private router: Router, private loginService: LoginService,private _notify: NotificationService) {
    this.isLoading = false;
  }

  ngOnInit() {
    document.getElementsByTagName('body')[0].style.backgroundColor = "#2f4050";
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.model).subscribe(
      res => {
        this.isLoading = false;
        if (res) {
          this._notify.success('success');
          this.router.navigate(['/']);
        } else {
          this.error = 'Incorrect username/password';
        }
      },
      err => {
        this.isLoading = false;
        this.error = err.status && err.status === 404 ? 'Incorrect username/password' : 'internal server error';
      }
    );
  }
}
