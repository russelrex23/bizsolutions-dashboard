import { Component, OnInit } from '@angular/core';
import {NotificationUtil} from '../../utils';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {RouteService} from '../../services/route.service';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private API_URL = environment.apiUrl;
  private SITE = environment.site;

  signUpFormGroup = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });
  isSigningUp = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private routeService: RouteService,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

  // signUp(): void {
  //   this.isSigningUp = true;
  //   const formData: any = new FormData();
  //   formData.append('email', this.signUpFormGroup.get('email').value);
  //   formData.append('password', this.signUpFormGroup.get('password').value);
  //   formData.append('contact', this.signUpFormGroup.get('contact').value);
  //   formData.append('address', this.signUpFormGroup.get('address').value);
  //   this.http.post(this.API_URL + '/signup.php',
  //     formData, {responseType: 'text'}).subscribe(
  //     (response) => {
  //       this.isSigningUp = false;
  //       NotificationUtil.success('Registration successful');
  //       this.routeService.navigate('/sign-in');
  //     }, (httpErrorResponse: HttpErrorResponse) => {
  //       if (httpErrorResponse.error.error) {
  //         this.errorMessage = httpErrorResponse.error.error;
  //       } else {
  //         NotificationUtil.error('Error! Wrong Email or Password!');
  //       }
  //       this.isSigningUp = false;
  //     }
  //   );
  // }

  signUp(): void {
    this.isSigningUp = true;
    this.accountService.createAccount(this.signUpFormGroup.value).subscribe(
      (account: Account) => {
        console.log(account);
        this.isSigningUp = false;
        NotificationUtil.success('Registration successful');
        this.routeService.navigate('/sign-in');
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.message) {
          NotificationUtil.error(httpErrorResponse.error.message);
        } else {
          this.errorMessage = 'Can\'t connect to the server at the moment. Please check your internet connection and try again.';
        }

        this.isSigningUp = false;
      }
    );
  }
}
