import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.route.params.subscribe((res) => {
      if (res['id']) {
        this.userId = res['id'];
        console.log(this.userId);
        this.userService.getUserById(this.userId).subscribe({
          next: (user) => {
            this.patchUserFormValue(user);
          },
          error: (err) => console.log(err),
        });
      }
    });
  }

  /**
   *
   * userform patch value
   * @param {User} user
   * @memberof UserUpdateComponent
   */
  patchUserFormValue(user: User): void {
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password,
    });
  }

  /**
   *
   * Initialization of user form
   * @memberof UserUpdateComponent
   */
  initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   *
   * Return boolean value if error occur
   * @param {string} controlName
   * @param {string} errorName
   * @return {*}  {boolean}
   * @memberof UserUpdateComponent
   */
  hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  /**
   * add or update user based on userid
   * @return {*}  {void}
   * @memberof UserUpdateComponent
   */
  saveUser(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
    this.userId ? this.update() : this.save();
  }

  /**
   * Save user
   * @memberof UserUpdateComponent
   */
  save(): void {
    this.userService.saveUser(this.userForm.value).subscribe({
      next: (user: User) => {
        if (user) {
          this.toast.success('User save successfully', 'Success', {
            timeOut: 1000,
          });
          this.router.navigate(['/']);
        }
      },
      error: (err) => console.log(err),
    });
  }

  /**
   *
   * Update user
   * @memberof UserUpdateComponent
   */
  update(): void {
    this.userService.updateUser(this.userForm.value, this.userId).subscribe({
      next: (user: User) => {
        if (user) {
          this.toast.success('User updated successfully', 'Success', {
            timeOut: 1000,
          });
          this.router.navigate(['/']);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
