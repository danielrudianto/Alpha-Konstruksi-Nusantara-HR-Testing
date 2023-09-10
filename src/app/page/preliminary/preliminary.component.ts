import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  greetings: string =
    'Hai, selamat datang di test online Engineer di PT Alpha Konstruksi Nusantara.~~~~~~ PT Alpha Konstruksi Nusantara merupakan sebuah perusahan kontraktor berlokasi di Bekasi, Indonesia dengan spesialisasi dalam bidang geoteknik dan subspesialis fondasi pengeboran (bored piles).~~~~~ Dalam lebih dari 10 tahun pengalamannya, PT Alpha Konstruksi Nusantara telah berhasil menyelesaikan beragam proyek di beragam daerah di Nusantara.';
  greetings_2: string =
    'Test akan dilaksanakan dengan durasi 60 menit. Selama masa pengerjaan, peserta diperbolehkan untuk mencari atau menelusuri jawaban via mesin pencarian (search engine), namun setiap jawaban yang terdeteksi melakukan plagiarisme akan dianggap gagal.';
  greetingTyping: string = '';
  greetingTyping_2: string = '';
  completed: boolean = false;

  formGroup: FormGroup = new FormGroup({
    token: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    agreement: new FormControl(false, Validators.requiredTrue),
  });

  submit() {
    this.isSubmitting = true;
    // this.router.navigate(['/Information']);
    this.http
      .post('http://localhost:5000/token/check', {
        token: this.formGroup.controls['token'].value,
      })
      .subscribe({
        next: (data: any) => {
          const authorization = data.token;
          const submittedCV = data.submittedCV;
          const submittedTest = data.submittedTest;

          if (submittedCV) {
            localStorage.setItem('authorization', authorization);
            this.isSubmitting = false;
            this.router.navigate(['/Quiz']);
            return;
          }

          if (submittedTest) {
            this.snackBar.open(
              'Anda sudah pernah mengikuti test ini',
              'Tutup',
              {
                duration: 1000,
              }
            );
            return;
          }

          localStorage.setItem('authorization', authorization);
          this.isSubmitting = false;
          this.router.navigate(['/Information']);
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

  typeGreeting() {
    let speed = 15;
    let totalTimeElapsed = 0;
    for (let i = 0; i < this.greetings.length; i++) {
      if (i == this.greetings.length - 1) {
        setTimeout(() => {
          this.typeSecondGreeting();
        }, totalTimeElapsed);
      }

      if (this.greetings[i] == '~') {
        // Add delay for new line
        setTimeout(() => {
          this.greetingTyping += '';
        }, speed * i * 5);
        totalTimeElapsed += speed * 5;
      } else {
        // Add delay for typing
        setTimeout(() => {
          this.greetingTyping += this.greetings.charAt(i);
        }, speed * i);
        totalTimeElapsed += speed;
      }
    }
  }

  typeSecondGreeting() {
    let speed = 15;
    let totalTimeElapsed = 0;
    for (let i = 0; i < this.greetings_2.length; i++) {
      if (i == this.greetings_2.length - 1) {
        setTimeout(() => {
          this.completed = true;
        }, totalTimeElapsed + 1000);
      }

      if (this.greetings_2[i] == '~') {
        // Add delay for new line
        setTimeout(() => {
          this.greetingTyping_2 += '';
        }, speed * i * 5);
        totalTimeElapsed += speed * 5;
      } else {
        // Add delay for typing
        setTimeout(() => {
          this.greetingTyping_2 += this.greetings_2.charAt(i);
        }, speed * i);
        totalTimeElapsed += speed;
      }
    }
  }

  ngOnInit(): void {
    this.typeGreeting();
  }
}
