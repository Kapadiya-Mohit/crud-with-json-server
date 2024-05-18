import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialougComponent } from '../../shared/confirmation-dialoug/confirmation-dialoug.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  modalRef!: BsModalRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get users list
   * @returns {*} {void}
   * @memberof UserListComponent
   */
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  /**
   *
   * Go to edit user route
   * @param {User} user
   * @memberof UserListComponent
   */
  goToEditUser(user: User) {
    this.router.navigate([`/add/${user.id}`]);
  }

  /**
   *
   * Delete user
   * @param {User} user
   * @memberof UserListComponent
   */
  deleteUser(user: User) {
    this.modalRef = this.modalService.show(ConfirmationDialougComponent);
    this.modalRef.onHidden?.subscribe((res) => {
      if (typeof res === 'boolean' && res === true) {
        if (user && user.id) {
          this.userService.deleteUser(user.id).subscribe({
            next: (user) => {
              if (user) {
                this.toast.success('User deleted successfully', 'Success', {
                  timeOut: 1000,
                });
                this.getUsers();
              }
            },
            error: (err) => console.log(err),
          });
        }
      }
    });
  }
}
