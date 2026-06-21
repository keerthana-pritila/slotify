import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatDialogModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  subscriberEmail: string = '';

  constructor(private dialog: MatDialog, private toastr: ToastrService) { }
  openHelpPopup(): void {
    this.dialog.open(HelpDialog, {
      width: '400px'
    });
  }
  subscribe(): void {
    if (!this.subscriberEmail.trim()) {
      this.toastr.warning('Please enter a valid email address.', 'Subscription Failed');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.subscriberEmail)) {
      this.toastr.error('Please enter a valid email address.', 'Subscription Failed');
      return;
    }
    this.toastr.success('Thank you for subscribing!', 'Subscription Successful');
    this.subscriberEmail = '';
  }
}

