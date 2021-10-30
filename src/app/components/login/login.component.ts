import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from 'src/app/services/auth.service';
import { setUserData } from 'src/app/state/actions/user.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.loginForm.controls; }

  EnterSubmit(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data?.error) {
            this.submitted = false;
            return this.loading = false;
          }
          this.store.dispatch(setUserData({ id: data?.userId }));
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('ERROR:', error);
          this.error = error;
          this.loading = false;
        });
  }
}
