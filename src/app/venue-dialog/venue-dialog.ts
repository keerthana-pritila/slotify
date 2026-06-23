import { Component,Inject,inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DelVenueDialog } from '../del-venue-dialog/del-venue-dialog';

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
dialog = inject(MatDialog);

  close(){
    this.dialogRef.close();
  }

  editVenue(){
    console.log('Edit clicked');
  }

  deleteVenue(){
  const dialogRef = this.dialog.open(
    DelVenueDialog,
    {
      width:'350px',
      data:this.venue
    }
  );
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      console.log('Delete venue');
      this.dialogRef.close({ delete:true, id:this.venue.id });
    }
  });

}

}
