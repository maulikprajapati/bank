import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, public userService: UserService) { }
  userName = "";
  ngOnInit() {
    const roles = this.authService.getUserRole();
    const userInfo = this.authService.getUserInfo();
    this.userName = userInfo.username;
    document.getElementsByTagName('body')[0].style.backgroundColor = "#f3f3f4";
    this.userService.getAccountById(userInfo.account_id).subscribe(data => {
    });
  }
  logout() {
    this.authService.setAuhToken('');
    this.router.navigate(['/login']);
  }
}
