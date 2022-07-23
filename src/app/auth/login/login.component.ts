import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }

  EnterSubmit(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const data = await this.authenticationService.login(
        this.f.username.value,
        this.f.password.value
      );

      if (data?.error) {
        this.submitted = false;
        this.loading = false;
        return;
      }

      this.router.navigate([this.returnUrl]);
    } catch (error) {
      console.log('ERROR:', error);
      this.error = error;
      this.loading = false;
    }
  }
}
