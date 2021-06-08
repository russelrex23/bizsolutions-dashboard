import {Component, OnInit} from '@angular/core';
import {NotificationUtil} from '../../utils';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {RouteService} from '../../services/route.service';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute} from '@angular/router';
import {PageUtil} from '../../utils/page.util';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private API_URL = environment.apiUrl;
  private SITE = environment.site;

  signUpFormGroup = this.fb.group({
    email: new FormControl(''),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  isSigningUp = false;
  errorMessage = '';
  isLoading = false;
  user = {
    email: ''
  };

  constructor(private fb: FormBuilder, private routeService: RouteService,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params.token;
      this.user = jwt_decode(token);
    });
  }

  userUpdate(): void {
    this.isSigningUp = true;
    this.signUpFormGroup.value.email = this.user.email;
    this.accountService.update(this.signUpFormGroup.value).subscribe(
      (account: Account) => {
        this.isSigningUp = false;
        NotificationUtil.success('Account Successfully Updated');
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

  showSecondaryLCP(): void {
    PageUtil.showModal('showSecondaryLcpPersonal');
  }

  showSecondaryLCPDetails(): void {
    PageUtil.hideModal('showSecondaryLcpPersonal');
    PageUtil.showModal('showSecondaryLcpPersonalDetails');
  }

  showTransactionComplete(): void {
    PageUtil.showModal('showTransactionComplete');
  }

  nextFirst(): void{
    PageUtil.click('pills-second-tab');
  }

  nextSecond(): void{
    PageUtil.click('pills-third-tab');
  }
}
