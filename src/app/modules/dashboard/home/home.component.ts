import {Component, OnInit, ViewChild} from '@angular/core';
import {PageUtil} from '../../../utils';
import {ActivatedRoute} from '@angular/router';
import {RouteService} from '../../../services/route.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {SignaturePad} from 'angular2-signaturepad';

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
  isReadOnly = true;
  isEdit = true;
  isSubmit = false;
  name001 = '';
  name002 = '';
  name003 = '';
  name004 = '';
  firstName = '';
  lastName = '';
  isBillingAddress = true;
  isShippingAddress = true;
  type = 1;
  creditSteps = 0;
  fileToUpload: File | null = null;
  file01: File | null = null;
  file02: File | null = null;
  file03: File | null = null;
  editUnderwriting = false;
  progress = 0;

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
  };

  public chartDonutData = [
    { label: 'Sales01', value: 12 },
    { label: 'Sales02', value: 30 },
    { label: 'Sales03', value: 20 },
  ];

  public chartCorporateScore = {
    resize: true,
    toto: 'roro',
    gridTextSize: 15,
    colors: [
      '#6FCF97',
      '#F2F2F2'
    ],
  };

  public chartCorporateData = [
    { label: '', value: 70 },
    { label: '', value: 30 },
  ];

  constructor(private activatedRoute: ActivatedRoute, private routeService: RouteService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.steps = params.steps;
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      if (this.steps !== undefined){
        this.isContractSubmit = true;
      }
    });
  }

  ngOnInit(): void {
    // this.isBillingAddress = false;
  }

  handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
  }

  handleFile01(files: FileList): void {
    this.file01 = files.item(0);
  }

  handleFile02(files: FileList): void {
    this.file02 = files.item(0);
  }

  handleFile03(files: FileList): void {
    this.file03 = files.item(0);
  }

  deleteFile(): void{
    this.fileToUpload = null;
  }

  deleteFile01(): void{
    this.file01 = null;
  }

  deleteFile02(): void{
    this.file02 = null;
  }

  deleteFile03(): void{
    this.file03 = null;
  }

  backToSelect($type): void{
    if ($type === 'credit'){
      PageUtil.showModal('showNoIdentityIq');
      PageUtil.hideModal('showIdentityIq');
    }else{
      PageUtil.showModal('showNoIdentityIq');
      PageUtil.hideModal('uploadDocument');
    }
  }

  selectedGoal(): void{
    this.isGoalSelected = true;
    this.isCreditReport = true;
    this.progress = 3;
    PageUtil.hideModal('goals');
    PageUtil.click('pills-third-tab');
  }

  toggleEditable(event): void {
    this.isChecked = event.target.checked;
    this.isBillingAddress = event.target.checked;
  }

  billAdd(event): void {
    this.isBillingAddress = event.target.checked;
  }

  shipAdd(event): void {
    this.isShippingAddress = event.target.checked;
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
    this.progress = 2;
    PageUtil.click('pills-second-tab');
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

  edit(): void{
    this.isReadOnly = false;
    this.isEdit = false;
    this.isSubmit = false;
  }

  back(): void{
    this.isReadOnly = true;
    this.isEdit = true;
  }

  submit(): void{
    this.isReadOnly = true;
    this.isEdit = true;
    this.isSubmit = true;
  }

  importCreditReport(): void{
    this.routeService.navigate('/dashboard/account');
  }

  downloadPDF(): void {

    const doc = new jsPDF();
    const img = this.sigUrl;
    autoTable(doc, {
      html: '#my-table',
      theme: 'plain',
      headStyles: { halign : 'center'},
      didDrawCell: function(data) {
        if (data.column.index === 0 && data.section === 'body') {
          doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y + 85, 15, 10);
        }
      }
    });
    doc.save('agreement.pdf');
  }

  showTier(): void{
    PageUtil.showModal('tier');
  }

  showNoIdentityIqModal(): void{
    PageUtil.showModal('showNoIdentityIq');
  }

  showIdentityIqModal(): void{
    PageUtil.showModal('showIdentityIq');
  }

  showChooseVendor(): void{
    PageUtil.showModal('chooseVendor');
  }

  creditReportCredentials(): void{
    this.creditSteps = 1;
    PageUtil.hideModal('showNoIdentityIq');
    PageUtil.showModal('creditReportCredentials');
  }

  credentialSuccess(): void{
    PageUtil.hideModal('creditReportCredentials');
    PageUtil.showModal('credentialSuccess');
  }

  uploadDocument(): void{
    PageUtil.hideModal('credentialSuccess');
    PageUtil.showModal('uploadDocument');
  }

  firstStep(): void{
    PageUtil.click('pills-first-tab');
  }

  secondStep(): void{
    PageUtil.click('pills-second-tab');
  }

  thirdStep(): void{
    PageUtil.click('pills-third-tab');
  }

  fourthStep(): void{
    this.progress = 4;
    PageUtil.hideModal('credentialSuccess');
    PageUtil.hideModal('showIdentityIq');
    PageUtil.click('pills-fourth-tab');
  }

  fifthStep(): void{
    PageUtil.click('pills-fifth-tab');
  }

  sixthStep(): void{
    PageUtil.click('pills-sixth-tab');
  }

  seventhStep(): void{
    PageUtil.click('pills-seventh-tab');
  }

  done(): void{
    PageUtil.click('');
  }
}
