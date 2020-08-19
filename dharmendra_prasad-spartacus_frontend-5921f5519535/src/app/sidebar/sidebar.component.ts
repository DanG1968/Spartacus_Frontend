import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../auth/AuthenticationService';
import { AccessInformation } from '../model/access.model';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;
  accessInfo: AccessInformation;

  constructor(private router: Router, private authenticationService: AuthenticationService, private accountService: AccountService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = this.router.url);
  }

  ngOnInit() {
    this.authenticationService.getAccessInformation().subscribe(t => {
      if (t) {
        this.accessInfo = t;
      }
    });

    this.accountService.getAccessInformation().subscribe(t => {
      if (t) {
        this.accessInfo = t;
      }
    });

    this.accountService.setRefresh(true);
  }

  userLoggedIn() {
    return AuthenticationService.isLoggedIn();
  }

  isVisible(module: string) {
    
    if (this.accessInfo == null || this.accessInfo == undefined) {
      return false;
    }
    if (this.accessInfo.userModules != null && this.accessInfo.userModules != undefined) {
      return this.accessInfo.userModules.indexOf(module) > -1
    }
  }

}
