import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-token-input',
  templateUrl: './token-input.component.html',
  styleUrls: ['./token-input.component.css'],
})
export class TokenInputComponent {
  constructor(
    private dialog: MatDialogRef<TokenInputComponent>,
    private ApiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  isSubmitting: boolean = false;

  tokenFormGroup: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required]),
  });

  onCancel() {
    this.dialog.close();
  }

  onSubmit() {
    this.isSubmitting = true;
    this.ApiService.post('token/check', {
      token: this.tokenFormGroup.controls['token'].value,
    })
      .subscribe({
        next: (response) => {
          this.dialog.close(response);
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000,
          });
        },
      })
      .add(() => {
        this.isSubmitting = false;
      });
  }
}
