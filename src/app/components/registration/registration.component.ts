import {Component, OnInit} from '@angular/core';
import {NotificationUtil} from '../../utils';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {RouteService} from '../../services/route.service';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute} from '@angular/router';
import {PageUtil} from '../../utils/page.util';
import { EmailService } from '../../services/email.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private API_URL = environment.apiUrl;
  private SITE = environment.site;

  signUpFormGroup =  new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  paymentFormGroup =  new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
    cardHolderName: new FormControl('', Validators.required)
  });

  isSigningUp = false;
  isRegister = false;
  emailConfirmation = false;
  errorMessage = ''
  successMessage = '';
  isLoading = false;
  user = {
    email: ''
  };
  product = '';
  confirmedEmail = '';
  step = '';
  rEmail = '';
  fName = '';
  lName = '';
  email = '';

  registrationFormGroup =  new FormGroup({
    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    cPass: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder, private routeService: RouteService,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private emailService: EmailService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.product = params.product;
      this.confirmedEmail = params.confirmedEmail;
      this.step = params.step;
      this.rEmail = this.confirmedEmail;
      this.fName = params.fName;
      this.lName = params.lName;
      this.email = params.email;
    });
  }

  sendEmail(): void {
    this.isSigningUp = true;
    const userEmail = this.signUpFormGroup.value.email;
    const payload = {
      email: userEmail
    };

    this.emailService.sendEmail(payload).subscribe(
      (response) => {
        this.isSigningUp = false;
        this.emailConfirmation = true;
        this.signUpFormGroup.reset();
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

  registration(): void {
    this.isRegister = true;
    this.signUpFormGroup.value.email = this.user.email;
    const payload = {
      fName: this.registrationFormGroup.value.fName,
      lName: this.registrationFormGroup.value.lName,
      email: this.rEmail,
      password: this.registrationFormGroup.value.pass
    };

    if (this.registrationFormGroup.value.pass !== this.registrationFormGroup.value.cPass){
      this.errorMessage = 'Password and Confirm Password are not match!';
      this.isRegister = false;
      return;
    }

    this.accountService.registration(payload).subscribe(
      (response) => {
        this.isRegister = false;
        window.location.href = '?status=regSuccess&fName=' + this.registrationFormGroup.value.fName
          + '&lName=' + this.registrationFormGroup.value.lName
          + '&email=' + this.rEmail;
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

  redirectToDashboard(): void {
    PageUtil.hideModal('showTransactionComplete');
    this.routeService.navigate('/dashboard');
  }

  showSecondaryLCP(): void {
    PageUtil.showModal('showSecondaryLcpPersonal');
  }

  hideSecondaryLCP(): void {
    PageUtil.hideModal('showSecondaryLcpPersonal');
  }

  showSecondaryLCPDetails(): void {
    PageUtil.hideModal('showSecondaryLcpPersonal');
    PageUtil.showModal('showSecondaryLcpPersonalDetails');
  }

  showTransactionComplete(): void {
    PageUtil.showModal('showTransactionComplete');
  }

  nextFirst(): void{
    PageUtil.hideModal('showSecondaryLcpPersonalDetails');
    PageUtil.click('pills-second-tab');
  }

  nextSecond(): void{
    PageUtil.click('pills-third-tab');
  }

  oneTime(): void{
    PageUtil.click('one-tab');
  }

  threeTime(): void{
    PageUtil.click('three-tab');
  }

  sevenTime(): void{
    PageUtil.click('seven-tab');
  }
}
