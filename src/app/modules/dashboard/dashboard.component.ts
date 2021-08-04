import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {RouteService} from '../../services/route.service';
import {PageUtil} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {SignaturePad} from 'angular2-signaturepad';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.steps = params.steps;
    });
  }

  hide = false;

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
  firstName = '';
  lastName = '';
  isBillingAddress = true;
  isShippingAddress = true;
  type = 1;
  creditSteps = 0;
  editUnderwriting = false;
  progress = 0;
  fileToUpload: File | null = null;
  file01: File | null = null;
  file02: File | null = null;
  file03: File | null = null;
  firstStepDone = false;
  secondStepDone = false;
  thirdStepDone = false;
  fourthStepDone = false;
  fifthStepDone = false;
  sixthStepDone = false;

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

  ngOnInit(): void {
  }

  signOut(): void {
    this.routeService.navigate('/sign-in');
    // this.authenticationService.signOut().subscribe(() => {
    //   localStorage.removeItem('token');
    //   this.routeService.navigate('/sign-in');
    // });
  }

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggler = document.getElementById('sidebarToggler');

    if (sidebar && sidebarToggler) {
      let sidebarMarginLeft = 0;
      let sidebarTogglerDisplay = 'none';

      if (sidebar.style.marginLeft === '0px') {
        sidebarMarginLeft = -250;
        sidebarTogglerDisplay = 'block';
      }

      sidebar.style.marginLeft = `${sidebarMarginLeft}px`;
      sidebarToggler.style.display = sidebarTogglerDisplay;
    }
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
    this.secondStepDone = true;
    PageUtil.hideModal('goals');
    PageUtil.click('pills-third-tab');
  }

  billAdd(event): void {
    this.isBillingAddress = event.target.checked;
  }

  shipAdd(event): void {
    this.isShippingAddress = event.target.checked;
  }

  agree(): void {
    PageUtil.hideModal('agreement');
    this.isContractSubmit = true;
    this.isGoalSelected = false;
    this.progress = 2;
    this.firstStepDone = true;
    PageUtil.click('pills-second-tab');
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

  stepSix(): void{
    PageUtil.click('step-six');
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
      didDrawCell(data) {
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
    this.firstStepDone = false;
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
    this.thirdStepDone = true;
    PageUtil.hideModal('credentialSuccess');
    PageUtil.hideModal('showIdentityIq');
    PageUtil.hideModal('uploadDocument');
    PageUtil.click('pills-fourth-tab');
  }

  fifthStep(): void{
    this.fourthStepDone = true;
    PageUtil.click('pills-fifth-tab');
  }

  sixthStep(): void{
    this.fifthStepDone = true;
    PageUtil.click('pills-sixth-tab');
  }

  seventhStep(): void{
    this.sixthStepDone = true;
    PageUtil.click('pills-seventh-tab');
  }

  done(): void{
    PageUtil.click('');
  }
}
