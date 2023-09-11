import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css'],
})
export class AddExperienceComponent implements OnInit {
  maxDate: Date = new Date();
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

  ngOnInit(): void {
    this.experienceFormGroup.controls['stillWorking'].valueChanges.subscribe({
      next: (data) => {
        if (data) {
          // If the user is still working, disable the end date
          this.experienceFormGroup.controls['end'].setValue('');
          // Remove the required validator
          this.experienceFormGroup.controls['end'].clearValidators();
          this.experienceFormGroup.controls['end'].disable();
        } else {
          // If the user is not working anymore, enable the end date
          this.experienceFormGroup.controls['end'].setValidators(
            Validators.required
          );
          this.experienceFormGroup.controls['end'].enable();
        }
      },
    });
  }
}
