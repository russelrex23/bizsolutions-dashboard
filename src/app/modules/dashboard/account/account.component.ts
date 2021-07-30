import {Component, OnInit, HostListener, ViewChild} from '@angular/core';
import {PageUtil} from '../../../utils';
import { MorrisJsModule } from 'angular-morris-js';
import {RouteService} from '../../../services/route.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {SignaturePad} from 'angular2-signaturepad';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
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

  fileToUpload: File | null = null;
  file01: File | null = null;
  file02: File | null = null;
  file03: File | null = null;
  steps = '';
  isReadOnly = true;
  isEdit = true;
  creditReportTab = true;
  isCreditReportDone = false;
  isImportCreditReportDone = false;
  type = 1;
  creditSteps = 0;
  editUnderwriting = false;
  firstName = '';
  lastName = '';
  sigUrl: any;
  isSignatureDone = false;
  isChecked = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: any = {
    minWidth: 1,
    canvasWidth: 400,
    canvasHeight: 100
  };

// ********Underwriting********//
  response01 = 'Yes';
  countryForm = this.fb.group({
    countryControl: new FormControl('')
  });

  languages = [
    {value: 'y', title : 'Yes'},
    {value: 'n', title : 'No'}
  ];
  selectedValues = ['y'];

  constructor(private routeService: RouteService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.steps = params.steps;
    });
  }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      countryControl: ['Canada']
    });
  }

  agree(): void {

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

  backToDashboard(): void{
    this.isImportCreditReportDone = true;
    this.routeService.navigate('/dashboard');
  }

  importCreditReport(): void{
    this.isCreditReportDone = true;
    this.creditReportTab = false;

    PageUtil.hideModal('showIdentityIq');
  }

  edit(): void{
    this.isReadOnly = false;
    this.isEdit = false;
  }

  back(): void{
    this.isReadOnly = true;
    this.isEdit = true;
  }

  submit(): void{
    this.isReadOnly = true;
    this.isEdit = true;
  }

  showNoIdentityIqModal(): void{
    PageUtil.showModal('showNoIdentityIq');
  }

  showIdentityIqModal(): void{
    PageUtil.showModal('showIdentityIq');
  }

  showUnderwriting(): void {
    PageUtil.showModal('underWriting');
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
}
