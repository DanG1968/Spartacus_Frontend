import { Component, OnInit } from '@angular/core';
import { UserModule } from '../model/usermodule.model';
import { AddusermodalComponent } from '../addusermodal/addusermodal.component';
import { AccountService } from '../auth/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usermgmt',
  templateUrl: './usermgmt.component.html',
  styleUrls: ['./usermgmt.component.scss']
})
export class UsermgmtComponent implements OnInit {
  users: UserModule[] = [];
  selectedUser: UserModule;

  constructor(public accountService: AccountService, public modalService: NgbModal, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.fetchUserData();
    this.accountService.refreshUsers().subscribe(t => {
      console.log(t + ' refresh data');
      if (t) {
        this.fetchUserData();
        this.accountService.setRefresh(false);
      }
    });

    this.accountService.setRefresh(true);
  }

  fetchUserData() {
    this.accountService.getUsers().subscribe(data => {
      console.log('response ' + data.body);
      this.users = [];
      data.body.forEach(element => {
        const user = new UserModule(element.username, element.email, element.roles, element.modules, element.id, element.teams);
        this.users.push(user);
      });
    });
  }

  openAddUserModal(link) {
    const modalRef = this.modalService.open(AddusermodalComponent);
    modalRef.componentInstance.src = link;
  }

  deleteUser(user: UserModule) {
    this.accountService.deleteUser(user).subscribe(data => {
      console.log("response " + data);
      this.accountService.setRefresh(true);
    });
  }

  onSubmit() {
    this.accountService.updateUsers(this.users).subscribe(data =>{
      console.log(data);
      this.accountService.setRefresh(true);
    })
  }

  changedRole(event, userIndex){
    this.users[userIndex].roles.forEach(r => r.selected = false);
    this.users[userIndex].roles[event.target.selectedIndex].selected = true;
    console.log("changed" +this.users+":"+userIndex+":"+event.target.selectedIndex);
  }

  changedTeam(event, userIndex){
    this.users[userIndex].teams.forEach(t => t.selected = false);
    this.users[userIndex].teams[event.target.selectedIndex].selected = true;
    console.log("changed" +this.users+":"+userIndex+":"+event.target.selectedIndex);
  }

  selectRow(user:UserModule){
    this.accountService.setSelectedUser(user);
    this.selectedUser = user;
  }

}
