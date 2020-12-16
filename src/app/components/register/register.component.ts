import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
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
        location: ['', Validators.required],
        specialties: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        pass: ['', [Validators.required, Validators.minLength(6)]],
        photo: [''],
      });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.registerForm.controls; }

  onSubmit(): void {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/login'], { queryParams: { registered: true }});
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}
