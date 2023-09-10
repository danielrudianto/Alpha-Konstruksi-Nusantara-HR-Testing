import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddCertificationComponent } from './add-certification/add-certification.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  isSubmitting: boolean = false;
  openAddExperience() {
    const dialog = this.dialog.open(AddExperienceComponent, {
      maxWidth: 640,
    });

    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data == null || data == undefined || data == '') {
          return;
        }

        this.experience.push(
          new FormGroup({
            company: new FormControl(data.company, Validators.required),
            position: new FormControl(data.position, Validators.required),
            start: new FormControl(data.start, Validators.required),
            end: new FormControl(data.end, Validators.required),
            description: new FormControl(data.description, Validators.required),
            stillWorking: new FormControl(data.stillWorking),
          })
        );
      },
    });
  }

  openAddCertification() {
    const dialog = this.dialog.open(AddCertificationComponent, {
      maxWidth: 640,
    });

    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data == null || data == undefined || data == '') {
          return;
        }

        this.certification.push(
          new FormGroup({
            issuer: new FormControl(data.issuer, Validators.required),
            name: new FormControl(data.name, Validators.required),
            description: new FormControl(data.description, Validators.required),
            year: new FormControl(data.year, Validators.required),
          })
        );
      },
    });
  }

  metaFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
  });

  educationFormGroup: FormGroup = new FormGroup({
    school: new FormControl('', Validators.required),
    major: new FormControl('', Validators.required),
    entry: new FormControl('', [
      Validators.required,
      Validators.max(new Date().getFullYear()),
      Validators.min(1900),
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
    graduation: new FormControl('', [
      Validators.required,
      Validators.max(new Date().getFullYear()),
      Validators.min(1900),
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
    gpa: new FormControl('', [
      Validators.required,
      Validators.max(4),
      Validators.min(0),
    ]),
    thesis: new FormControl(''),
  });

  informationFormGroup: FormGroup = new FormGroup({
    experience: new FormArray([]),
    certification: new FormArray([]),
  });

  get t() {
    return this.informationFormGroup.controls;
  }

  get experience() {
    return this.t['experience'] as FormArray;
  }

  get certification() {
    return this.t['certification'] as FormArray;
  }

  getExperienceAt(index: number): FormGroup {
    return this.experience.controls[index] as FormGroup;
  }

  getCertificationAt(index: number): FormGroup {
    return this.certification.controls[index] as FormGroup;
  }

  deleteExperience(i: number) {
    this.experience.removeAt(i);
  }

  submit() {
    this.isSubmitting = true;
    this.http
      .post(
        'https://api.alphakonstruksi.id/curriculum',
        {
          name: this.metaFormGroup.controls['name'].value,
          phoneNumber: this.metaFormGroup.controls['phoneNumber'].value,
          email: this.metaFormGroup.controls['email'].value,
          address: this.metaFormGroup.controls['address'].value,
          dateOfBirth: this.metaFormGroup.controls['dateOfBirth'].value,
          education: {
            school: this.educationFormGroup.controls['school'].value,
            major: this.educationFormGroup.controls['major'].value,
            entry: this.educationFormGroup.controls['entry'].value,
            graduate: this.educationFormGroup.controls['graduation'].value,
            gpa: this.educationFormGroup.controls['gpa'].value,
            thesis: this.educationFormGroup.controls['thesis'].value,
          },
          experience: this.experience.value,
          certification: this.certification.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('authorization')}`,
          },
        }
      )
      .subscribe({
        next: (_) => {
          this.router.navigate(['/Quiz']);
        },
        error: (error) => {
          console.log(error);
          this.isSubmitting = false;
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      })
      .add(() => {});
  }
}
