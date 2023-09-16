import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  maxDate: Date = new Date();
  minDate: Date = new Date();

  ngOnInit(): void {
    // Maximum date is 18 years ago
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // Minimum date is 50 years ago
    this.minDate.setFullYear(this.minDate.getFullYear() - 50);
  }

  isSubmitting: boolean = false;

  metaFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    nickName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
  });

  submit() {
    this.isSubmitting = true;
    this.http
      .post(
        'http://localhost:5000/curriculum',
        {
          name: this.metaFormGroup.controls['name'].value,
          nickName: this.metaFormGroup.controls['nickName'].value,
          phoneNumber: this.metaFormGroup.controls['phoneNumber'].value,
          email: this.metaFormGroup.controls['email'].value,
          address: this.metaFormGroup.controls['address'].value,
          city: this.metaFormGroup.controls['city'].value,
          dateOfBirth: this.metaFormGroup.controls['dateOfBirth'].value,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('authorization')}`,
            'Access-Control-Allow-Origin': '*',
          }),
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
