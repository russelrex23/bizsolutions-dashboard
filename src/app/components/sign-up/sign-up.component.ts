import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { SigninService } from '../../services/signin.service';
import { RouteService } from '../../services/route.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {NotificationUtil} from '../../../utils';
import {environment} from '../../../environments/environment';
import {GenericObject} from '../../../models/generic-object';
import {Authorization} from '../../../models/authorization';
import { EmailService } from '../../services/email.service';

import {HttpRequestService} from '../../services/http-request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private API_URL = environment.apiUrl;
  private SG_API = environment.sgApi;
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
      email: userEmail,
      site: this.SITE
    };

    this.emailService.sendEmail(payload).subscribe(
      (response) => {
        console.log(response);
      }, (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === 200) {
          setTimeout(() => {
            this.isSigningUp = false;
            this.signUpFormGroup.reset();
            NotificationUtil.success('Email Verification Successful! Please check this inbox of your email!');
          }, 2000);
        }
        console.log(httpErrorResponse);
      }
    );
    // const sgMail = require('@sendgrid/mail');
    // const site = this.SITE;
    // const email = this.signUpFormGroup.value.email;
    // sgMail.setApiKey(this.SG_API);
    // const msg = {
    //   to: email, // Change to your recipient
    //   from: 'bizsolutions841@gmail.com', // Change to your verified sender
    //   subject: 'Welcome to Biz Solutions',
    //   text: 'Welcome to Biz Solutions',
    //   html: '<div class="container" style="height:200px; text-align: center;"><strong>Welcome to Biz Solutions<strong><br><br>' +
    //         'Thank you for the verification, please click the button below!<br><br>' +
    //         '<a href="' + site + '/registration"><button type="button">Click To Redirect To Registration Page!</button></a></div>',
    // };
    // return sgMail
    //   .send(msg)
    //   .then((response) => {
    //     console.log(response);
    //     this.isSigningUp = false;
    //     this.signUpFormGroup.reset();
    //     NotificationUtil.success('Email Verification Successful! Please check this inbox of your email!');
    //   })
    //   .catch((error: any) => console.log('Error sending email: ', error));
  }
}
