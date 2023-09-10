import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.css'],
})
export class AddCertificationComponent {
  constructor(private dialog: MatDialogRef<AddCertificationComponent>) {}

  experienceFormGroup: FormGroup = new FormGroup({
    issuer: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    year: new FormControl('', [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
  });

  submit() {
    this.dialog.close(this.experienceFormGroup.value);
  }
}
