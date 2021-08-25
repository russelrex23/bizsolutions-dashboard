import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { SigninService } from '../../services/signin.service';
import { RouteService } from '../../services/route.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {NotificationUtil} from '../../utils';
import {environment} from '../../../environments/environment';
import {GenericObject} from '../../models/generic-object';
import {Authorization} from '../../models/authorization';
import { EmailService } from '../../services/email.service';

import {HttpRequestService} from '../../services/http-request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private API_URL = environment.apiUrl;
  private SITE = environment.site;

  signUpFormGroup = this.fb.group({
    email: new FormControl('', Validators.required)
  });
  isSigningUp = false;
  errorMessage = '';
  isLoading = false;
  title = 'node-express-angular';
  status = 'DOWN';

  constructor(private fb: FormBuilder, private routeService: RouteService, private signinService: SigninService,
              private http: HttpClient, private httpRequestService: HttpRequestService,
              private emailService: EmailService) { }

  ngOnInit(): void {}

  sendEmail(): void {
    this.isSigningUp = true;
    const userEmail = this.signUpFormGroup.value.email;
    const payload = {
      email: userEmail
    };

    this.emailService.sendEmail(payload).subscribe(
      (response) => {
        this.isSigningUp = false;
        this.signUpFormGroup.reset();
        NotificationUtil.success(response.success_message);
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.error) {
          this.errorMessage = httpErrorResponse.error.error;
        } else {
          this.errorMessage = 'Can\'t connect to the server at the moment. Please check your internet connection and try again.';
        }

        this.isSigningUp = false;
      }
    );
  }
}
