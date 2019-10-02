import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../enews-noticebrd-dlyntes/enews-noticebrd-dlyntes.component';
@Component({
  selector: 'app-modal-edit-item',
  templateUrl: './modal-edit-item.component.html',
  styleUrls: ['./modal-edit-item.component.css']
})
export class ModalEditItemComponent implements OnInit {
  public errormsg:String;
  public inputData:String;
  public secondField:string;
  public webUrl:string;
  constructor( public dialogRef: MatDialogRef<ModalEditItemComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:DialogData ) { 
      if( this.data.secondfield ){
        this.inputData = data.inputData;
        this.secondField = data.detail;
        this.webUrl = data.webUrl;
      }
    }

  ngOnInit() {
  }
  public onNoClick(){
    if( !this.inputData  ){
      this.errormsg = "Field cannot be empty";
      return;
    }
    if( this.data.secondfield ){
      if(! this.secondField){
        this.errormsg = "Field cannot be empty";
        return;
      }
    }
    this.dialogRef.close({inputData:this.inputData, secondField:this.secondField, webUrl:this.webUrl,isCancel:false});
  }
  public cancel(){
    this.dialogRef.close({ isCancel:true });
  }
}
