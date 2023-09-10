import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  constructor(private dialog: MatDialogRef<ConfirmationDialogComponent>) {}

  submit() {
    this.dialog.close(true);
  }

  close() {
    this.dialog.close(false);
  }
}
