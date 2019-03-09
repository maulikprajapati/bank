import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery-slimscroll';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';


declare var jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  imgBase64: any;
  currentMenu: string;

  @Input() layoutMenu: any;
  userName: string;
  constructor(public router: Router, private authService: AuthService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery('body').hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      });
    }
  }

  activeRoute(routename: string): boolean {

    return false;
    //return this.router.url.indexOf(routename) > -1;
  }

  goToHome() {

    this.router.navigateByUrl(`/`);
  }

  logout() {
    this.authService.setAuhToken('');
    this.router.navigateByUrl(`/login`);
  }

  changeTheme() {

  }


}
