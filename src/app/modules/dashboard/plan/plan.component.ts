import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  sigUrl: any;
  isSignatureDone = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('content', {static: false}) content: ElementRef;

  isReadOnly = true;
  isEdit = true;
  isSubmit = false;
  name001 = '';
  name002 = '';
  name003 = '';
  name004 = '';
  isChecked = false;

  public signaturePadOptions: any = {
    minWidth: 1,
    canvasWidth: 400,
    canvasHeight: 100
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  toggleEditable(event): void {
    this.isChecked = event.target.checked;
  }

  openPDF(): void {

    const doc = new jsPDF();
    const img = this.sigUrl;
    autoTable(doc, {
      html: '#my-table',
      theme: 'plain'
      // didDrawCell: function(data) {
      //   if (data.column.index === 0 && data.section === 'body') {
      //     doc.addImage(img, 'JPEG', data.cell.x + 143, data.cell.y + 3, 20, 10);
      //   }
      // }
    });
    doc.save('work-plan.pdf');

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

  drawComplete(): void {
    this.sigUrl = this.signaturePad.toDataURL();
    console.log('Sign: ' + this.sigUrl);
  }

  drawStart(): void {

  }

  clear(): void {
    this.signaturePad.clear();
  }

  saveSig(): void {
    this.isSignatureDone = true;
  }

  displaySig(): void {
    this.isSignatureDone = false;
  }
}
