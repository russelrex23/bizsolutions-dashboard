import { Component, OnInit, HostListener } from '@angular/core';
import {PageUtil} from '../../../utils';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ViewportScroller } from '@angular/common';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-lcp-personal',
  templateUrl: './lcp-personal.component.html',
  styleUrls: ['./lcp-personal.component.css']
})
export class LcpPersonalComponent implements OnInit {

  fileToUpload: File;
  comment = '';
  msg = '';
  url: string | ArrayBuffer = '';
  isCommentSend = false;
  commentMsg = '';
  commentUrl: string | ArrayBuffer = '';
  fieldTextType: boolean;
  hutton = false;
  creditHistory = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // @ts-ignore
    upload: (file: File) => {
      this.fileToUpload = file;
      const mimeType = file.type;

      if (mimeType.match(/image\/*/) == null) {
        this.msg = 'Only images are supported';
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.msg = '';
        this.url = reader.result;
      };
    },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  public chartDonutOptions = {
    resize: true,
    toto: 'roro',
    colors: [
      '#F15A24',
      '#F5891D'
    ],
  };

  public chart = {
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Series A']
  };

  public chartDonutData = [
    { label: 'Sales01', value: 12 },
    { label: 'Sales02', value: 30 },
    { label: 'Sales03', value: 20 },
  ];

  public chartAreaData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 75,  b: 65 },
    { y: '2008', a: 50,  b: 40 },
    { y: '2009', a: 75,  b: 65 },
    { y: '2010', a: 50,  b: 40 },
    { y: '2011', a: 75,  b: 65 },
    { y: '2012', a: 100, b: 90 }
  ];

  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller) { }

  ngOnInit(): void {
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  showSimulate(): void{
    PageUtil.showModal('simulate');
  }

  showCreditHistory(): void{
    this.creditHistory = true;
  }

  showPaymentHistory(): void{
    PageUtil.showModal('payment-history');
  }

  backToSteps(): void{
    this.hutton = false;
    this.creditHistory = false;
  }

  showHutton(): void{
    this.scroll.scrollToPosition([0 , 0]);
    this.hutton = true;
  }

  sendComment(): void{
    this.isCommentSend = true;
    this.commentMsg = this.comment;
    this.commentUrl = this.url;
  }
}
