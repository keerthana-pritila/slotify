import { Component,Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-del-venue-dialog',
  imports: [],
  templateUrl: './del-venue-dialog.html',
  styleUrl: './del-venue-dialog.scss',
})
export class DelVenueDialog {
  constructor(
    public dialogRef: MatDialogRef<DelVenueDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data:any
  ){}

  close(){
    this.dialogRef.close();
  }

  confirmDelete(){
    this.dialogRef.close(true);
  }
}
