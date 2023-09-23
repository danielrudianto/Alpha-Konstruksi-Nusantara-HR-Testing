import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preliminary',
  templateUrl: './preliminary.component.html',
  styleUrls: ['./preliminary.component.css'],
})
export class PreliminaryComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  isSubmitting: boolean = false;
  job: number = 0;

  formGroup: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  submit() {
    this.isSubmitting = true;
    // this.router.navigate(['/Information']);
    this.http
      .post(
        `${environment.apiURL}token/check`,
        {
          token: this.formGroup.controls['token'].value,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
        }
      )
      .subscribe({
        next: (data: any) => {
          const authorization = data.token;
          const submittedCV = data.submittedCV;
          const submittedTest = data.submittedTest;

          console.log(data);

          if (!submittedTest && submittedCV) {
            localStorage.setItem('authorization', authorization);
            this.isSubmitting = false;
            this.router.navigate(['/Quiz']);
            return;
          }

          if (submittedCV && submittedTest) {
            this.snackBar.open(
              'Anda sudah pernah mengikuti test ini',
              'Tutup',
              {
                duration: 1000,
              }
            );
            return;
          }

          if (!submittedCV && !submittedTest) {
            localStorage.setItem('authorization', authorization);
            this.isSubmitting = false;
            this.router.navigate(['/Information']);
            return;
          }
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      })
      .add(() => {
        this.isSubmitting = false;
      });
  }

  ngOnInit(): void {
    Aos.init();
  }
}
