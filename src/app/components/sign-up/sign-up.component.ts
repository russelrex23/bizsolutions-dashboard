import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { SigninService } from '../../services/signin.service';
import { RouteService } from '../../services/route.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {NotificationUtil} from '../../../utils';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  API_URL = 'https://bizsolutions.app/src/api';

  signUpFormGroup = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });
  isLoggingIn = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private routeService: RouteService, private signinService: SigninService,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  signUp(): void {
    const formData: any = new FormData();
    formData.append('email', this.signUpFormGroup.get('email').value);
    formData.append('password', this.signUpFormGroup.get('password').value);
    formData.append('contact', this.signUpFormGroup.get('contact').value);
    formData.append('address', this.signUpFormGroup.get('address').value);
    this.http.post(this.API_URL + '/signup.php',
      formData, {responseType: 'text'}).subscribe(
      (response) => {
        console.log(response);
        this.isLoggingIn = false;
        NotificationUtil.success('Registration successful');
        this.routeService.navigate('/sign-in');
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.error) {
          this.errorMessage = httpErrorResponse.error.error;
        } else {
          NotificationUtil.error('Error! Wrong Email or Password!');
        }
        this.isLoggingIn = false;
      }
    );
  }
}
