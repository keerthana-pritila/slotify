import { Component,Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-venue-dialog',
  imports: [],
  templateUrl: './venue-dialog.html',
  styleUrl: './venue-dialog.scss',
})
export class VenueDialog {
   constructor(
    public dialogRef:MatDialogRef<VenueDialog>,
    @Inject(MAT_DIALOG_DATA)
    public venue:any
  ){}

  close(){
    this.dialogRef.close();
  }

  editVenue(){
    console.log('Edit clicked');
  }

  deleteVenue(){
    console.log('Delete clicked');
  }

}
