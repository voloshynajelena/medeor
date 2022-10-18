import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hidePass = true;
  hideConfirmPass = true;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  avatarB64Data: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, this.compareToValidator()]],
      photo: [''],
    });
  }

  compareToValidator(): any {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value !== this.f?.pass?.value
        ? { compareTo: { value: control.value } }
        : null;
    };
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.registerForm?.controls;
  }

  downloadAvatar(fileInput: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        this.avatarB64Data = e.target.result;
      }
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .register({...this.registerForm.value, photo: this.avatarB64Data})
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (!data) {
            this.submitted = false;
            return (this.loading = false);
          }
          this.router.navigate(['/login'], {
            queryParams: { registered: true },
          });
        },
        (error) => {
          console.log('ERROR:', error);
          this.error = error;
          this.loading = false;
        }
      );
  }
}
