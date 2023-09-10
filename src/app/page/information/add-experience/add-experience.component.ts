import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css'],
})
export class AddExperienceComponent {
  constructor(private dialog: MatDialogRef<AddExperienceComponent>) {}

  experienceFormGroup: FormGroup = new FormGroup({
    company: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    stillWorking: new FormControl(false),
  });

  submit() {
    this.dialog.close(this.experienceFormGroup.value);
  }
}
