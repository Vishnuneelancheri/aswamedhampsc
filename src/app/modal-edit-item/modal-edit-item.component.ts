import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-modal-edit-item',
  templateUrl: './modal-edit-item.component.html',
  styleUrls: ['./modal-edit-item.component.css']
})
export class ModalEditItemComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalEditItemComponent>) {}

  ngOnInit() {
  }
  public close(){
    this.dialogRef.close();
  }

}
