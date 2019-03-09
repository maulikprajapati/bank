import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { smoothlyMenu } from 'src/app/app.helpers';
import { AuthService } from 'src/app/shared/services/auth.service';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private router: Router, private authService: AuthService,
    private _sanitizer: DomSanitizer) { }

  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  logout() {
    this.authService.setAuhToken('');
    this.router.navigate(['/login']);
  }

}
