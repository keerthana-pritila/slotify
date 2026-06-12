import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-logout-dialog',
  imports: [MatDialogModule,
    MatButtonModule],
  templateUrl: './logout-dialog.html',
  styleUrl: './logout-dialog.scss',
})
export class LogoutDialog {}
