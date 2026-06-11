import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatDialogModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(private dialog: MatDialog) { }
  openHelpPopup(): void {
    this.dialog.open(HelpDialog, {
      width: '400px'
    });
  }
}

