import {Component, OnInit, ViewChild} from '@angular/core';
import {PageUtil} from '../../../utils';
import {ActivatedRoute} from '@angular/router';
import {RouteService} from '../../../services/route.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {SignaturePad} from "angular2-signaturepad";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sigUrl: any;
  isSignatureDone = false;
  steps = '';
  isChecked = false;
  isContractSubmit = false;
  isGoalSelected = false;
  isCreditReport = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  goals = [
    {
      data: 'Get "Lender Compliant" to where my company qualifies for credit without a Personal Guarantee'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of securing funding for my business'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of Purchasing Equipment for my business and or project'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of Purchasing Real Estate'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of a business deal (e.g. Government Contract, Prospective Partnership, New Business Launch, etc.)'
    },
    {
      data: 'Other: PLEASE SPECIFY'
    }
  ];

  selectedObject: any = this.goals[0];

  public signaturePadOptions: any = {
    minWidth: 1,
    canvasWidth: 400,
    canvasHeight: 100
  };

  public chartDonutOptions = {
    resize: true,
    toto: 'roro',
    colors: [
      '#F15A24',
      '#F5891D'
    ],
    // labelColor: '#cc241c',
  };

  public chartDonutData = [
    { label: 'Sales01', value: 12 },
    { label: 'Sales02', value: 30 },
    { label: 'Sales03', value: 20 },
  ];

  constructor(private activatedRoute: ActivatedRoute, private routeService: RouteService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.steps = params.steps;
      if (this.steps !== undefined){
        this.isContractSubmit = true;
      }
    });
  }

  ngOnInit(): void {
  }

  selectedGoal(): void{
    this.isGoalSelected = true;
    this.isCreditReport = true;
    PageUtil.hideModal('goals');
  }

  toggleEditable(event): void {
    this.isChecked = event.target.checked;
  }

  redirectToCreditReport(): void {
    this.routeService.navigate('/dashboard/account');
  }

  redirectToWorkPlan(): void {
    this.routeService.navigate('/dashboard/plan');
  }

  agree(): void {
    PageUtil.hideModal('agreement');
    this.isContractSubmit = true;
    this.isGoalSelected = false;
  }

  showGoals(): void {
    PageUtil.showModal('goals');
  }

  showAgreement(): void {
    PageUtil.showModal('agreement');
  }

  showLcpIntakeForm(): void {
    PageUtil.showModal('lcpIntakeForm');
  }

  stepOne(): void{
    PageUtil.click('step-one');
  }

  stepTwo(): void{
    PageUtil.click('step-two');
  }

  stepThree(): void{
    PageUtil.click('step-three');
  }

  stepFour(): void{
    PageUtil.click('step-four');
  }

  stepFive(): void{
    PageUtil.click('step-five');
  }

  clear(): void {
    this.signaturePad.clear();
  }

  saveSig(): void {
    this.isSignatureDone = true;
  }

  drawComplete(): void {
    this.sigUrl = this.signaturePad.toDataURL();
    console.log('Sign: ' + this.sigUrl);
  }

  displaySig(): void {
    this.isSignatureDone = false;
  }

  showUnderwriting(): void {
    PageUtil.showModal('underWriting');
  }
}
