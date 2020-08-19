import { Component, OnInit } from '@angular/core';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  tab = 'users';
  constructor(public accountService: AccountService) {

  }
  ngOnInit() {
  }

  selectedTab(data: string) {
    this.tab = data;
    this.accountService.setRefreshTeam(true);
    this.accountService.setRefresh(true);
  }
}
