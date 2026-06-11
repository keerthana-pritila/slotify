import { Component } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './help-dialog.html',
  styleUrl: './help-dialog.scss',
})
export class HelpDialog {
  constructor(private router: Router,
    private dailogRef: MatDialogRef<HelpDialog>) { }
  //private router : Router -- This injects Angular's official routing service (Router)

  //  private dailogRef : MatDialogRef<HelpDialog> -- This injects a reference link to an Angular Material dialog window (MatDialogRef)
  //   The <HelpDialog> generic indicates that this reference specifically controls a dialog component named HelpDialog.
  //   It gives your code direct control over the active pop-up modal, 
  //   allowing you to close it or pass data back to the parent screen.

  gotoFAQ(): void {
    this.dailogRef.close();
    this.router.navigate(['/faq']);
  }
}


