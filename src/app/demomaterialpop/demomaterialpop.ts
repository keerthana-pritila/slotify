import { Component, Inject, AfterViewInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material/button';
// import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-demomaterialpop',
    standalone: true,
   imports: [
    QRCodeComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './demomaterialpop.html',
  styleUrl: './demomaterialpop.scss',
})
export class DemoMaterialpop implements AfterViewInit {
    showPopup = false;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any
) {}
ngAfterViewInit(): void {
  setTimeout(() => {
    this.showPopup = true;
  });
}
}

