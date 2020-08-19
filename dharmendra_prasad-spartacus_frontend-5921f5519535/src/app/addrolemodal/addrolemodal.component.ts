import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../auth/team.service';
import { Team } from '../model/team.model';
import { Module } from '../model/modules.model';
import { ModuleService } from '../auth/module.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Role } from '../model/role.model';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-addrolemodal',
  templateUrl: './addrolemodal.component.html',
  styleUrls: ['./addrolemodal.component.scss']
})
export class AddrolemodalComponent implements OnInit {
  teams: Team[] = [];
  modules: Module[] = [];
  submitted = false;
  addRoleForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, public teamService: TeamService, public moduleService: ModuleService,
    public accountService: AccountService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.addRoleForm = this.formBuilder.group({
      rolename: ['', Validators.required],
      team: ['', [Validators.required]]
    });

    this.teamService.getTeams().subscribe(data => {
      this.teams = [];
      data.body.forEach(element => {
        const team = new Team(element.id, element.name, false);
        this.teams.push(team);
      });
    });

    this.moduleService.getModules().subscribe(data => {
      this.modules = [];
      data.body.forEach(element => {
        const module = new Module({ id: element.id, name: element.name, selected: false });
        this.modules.push(module);
      });
    });
  }

  selectChangeHandlerTeam(event: any) {
    // update the ui
    if(this.teams.length >= event.target.selectedIndex){
      this.addRoleForm.value.team = this.teams[event.target.selectedIndex];
    }
  }

  selectChangeHandlerModule(event: any, moduleindex: number) {
    this.modules[moduleindex].selected = event.target.selectedOptions[0].value === 'YES' ? true : false;
    console.log(moduleindex);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addRoleForm.invalid) {
      return;
    }
    // Initialize Params Object
    const Params = new HttpParams();
    // Begin assigning parameters
    const rolename = this.addRoleForm.value.rolename;
    const team = this.addRoleForm.value.team;
    const modules = this.modules;
    let role: Role = new Role({ id: -1, selected: false, name: rolename, team: team, modules: modules });
    this.accountService.saveRole(role).subscribe(data => {
      console.log(data + ' Role create response');
      this.activeModal.close();
      this.accountService.setRefresh(true);
    });
  }

}
