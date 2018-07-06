import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

import {
  UserService,
  DeleteUserStatus,
} from 'app/user-management/shared/user.service';
import { User } from 'app/user-management/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // Alert message flags. Displays if value not empty or false
  genericError = false;

  createdUser = '';

  updatedUser = '';
  updatedUserNotFound = '';

  activeModal: NgbModalRef;

  deletedUser = '';
  deletedUserNotFound = '';

  selected: User[] = [];

  users: User[];

  columns = [{ prop: 'username' }];
  usernameToDelete = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('createdUser')) {
        this.createdUser = params.get('createdUser');
      }

      if (params.has('updatedUser')) {
        this.updatedUser = params.get('updatedUser');
      }

      if (params.has('updatedUserNotFound')) {
        this.updatedUserNotFound = params.get('updatedUserNotFound');
      }
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (err) => {
        console.error(err);
        this.genericError = true;
      }
    );
  }

  ngOnInit() {
    this.fetchUsers();
  }

  open(content, username: string) {
    this.usernameToDelete = username;
    console.log(content);

    this.activeModal = this.modalService.open(content);
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe(
      (result: DeleteUserStatus) => {
        this.clearAlerts();
        if (result === DeleteUserStatus.DELETE_OK) {
          this.deletedUser = username;
        } else {
          this.genericError = true;
        }

        this.activeModal.close();
        this.fetchUsers();
      },
      (err: DeleteUserStatus) => {
        this.clearAlerts();
        if (err === DeleteUserStatus.DELETE_ERR_NOT_FOUND) {
          this.deletedUserNotFound = username;
        } else {
          this.genericError = true;
        }

        this.activeModal.close();
        this.fetchUsers();
      }
    );
  }

  clearAlerts() {
    this.createdUser = '';
    this.deletedUser = '';
    this.deletedUserNotFound = '';
    this.genericError = false;
    this.updatedUser = '';
    this.updatedUserNotFound = '';
  }
}