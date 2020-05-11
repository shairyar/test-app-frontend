import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  submitted = false;
  authenticationError = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (this.authenticationService.isAuthenticated()){
      this.router.navigate(['messages']);
    }

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signInForm.controls;
  }

  submitSignInForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    this.apiService.signIn(this.signInForm.value).subscribe(response => {
      this.authenticationService.login(response);
    }, (error) => {
      this.signInForm.controls.password.reset();
      console.log(error.status);
      if (error.status === 401) {
        this.authenticationError = true;
      }
    });
  }

}
