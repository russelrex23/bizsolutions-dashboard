import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { SigninService } from '../../services/signin.service';
import {AuthenticationService} from '../../services/authentication.service';
import { RouteService } from '../../services/route.service';
import {environment} from '../../../environments/environment';
import {Authorization} from '../../models/authorization';
import {NotificationUtil} from '../../utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private API_URL = environment.apiUrl;

  signInFormGroup = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  isLoggingIn = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private routeService: RouteService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.routeService.navigate('/sign-in');
    }, 500);
  }

  // signIn(): void {
  //   this.isLoggingIn = true;
  //   const formData: any = new FormData();
  //   formData.append('email', this.signInFormGroup.get('email').value);
  //   formData.append('password', this.signInFormGroup.get('password').value);
  //   this.http.post(this.API_URL + '/signin.php',
  //     formData, {responseType: 'text'}).subscribe(
  //     (response) => {
  //       this.isLoggingIn = false;
  //       NotificationUtil.success('Success');
  //       this.routeService.navigate('/dashboard');
  //       }, (httpErrorResponse: HttpErrorResponse) => {
  //         NotificationUtil.error('Error! Wrong Email or Password!');
  //         this.isLoggingIn = false;
  //       }
  //   );
  // }

  signIn(): void {
    this.isLoggingIn = true;
    this.authenticationService.authenticate(this.signInFormGroup.value).subscribe(
      (authorization: Authorization) => {
        this.isLoggingIn = false;
        localStorage.setItem('token', authorization.token);
        NotificationUtil.success(authorization.message);
        this.routeService.navigate('/dashboard');
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.message) {
          NotificationUtil.error(httpErrorResponse.error.message);
        } else {
          this.errorMessage = 'Can\'t connect to the server at the moment. Please check your internet connection and try again.';
        }

        this.isLoggingIn = false;
      }
    );
  }
}
