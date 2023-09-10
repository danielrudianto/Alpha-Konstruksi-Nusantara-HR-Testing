import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { toHTML } from 'ngx-editor';
import { ConfirmationDialogComponent } from 'src/app/component/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  index: number = 0;
  endTime: Date = new Date();

  isLoading: boolean = false;

  questionTypes: string[] = [
    'Civil Engineering',
    'Geotechnical Engineering',
    'Drawing',
  ];
  questionsLength: number[] = [0, 0, 0];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http
      .get('https://api.alphakonstruksi.id/test', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('authorization'),
        },
      })
      .subscribe({
        next: (data: any) => {
          this.questions = data['questions'];
          this.endTime = new Date(data['expiredAt']);

          // If the test has expired, redirect to home page
          if (this.endTime.getTime() < new Date().getTime()) {
            this.snackBar.open(
              'Waktu ujian telah habis. Terima kasih atas waktunya.',
              'Tutup',
              {
                duration: 1000,
              }
            );

            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });

          this.router.navigate(['/']);
        },
      });
    this.questionsLength[0] = this.questions.filter(
      (question) => question.type == 'civil'
    ).length;
    this.questionsLength[1] = this.questions.filter(
      (question) => question.type == 'geo'
    ).length;
    this.questionsLength[2] = this.questions.filter(
      (question) => question.type == 'drawing'
    ).length;
  }

  onNextQuestion(event: any) {
    if (this.index == this.questions.length - 1) {
      this.questions[this.index].answer = event == undefined ? null : event;
      const dialog = this.dialog.open(ConfirmationDialogComponent, {
        minWidth: '300px',
      });

      dialog.afterClosed().subscribe((result) => {
        if (result) {
          this.submit();
        }
      });
    } else {
      this.questions[this.index].answer = event;
      this.index++;
    }
  }

  onPreviousQuestion(event: any) {
    this.questions[this.index].answer = event;
    if (this.index == 0) {
      return;
    } else {
      this.index--;
    }
  }

  submit() {
    const result = [];
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].type == 'drawing') {
        result.push({
          question: this.questions[i].id,
          answer: this.questions[i].answer,
        });
      } else {
        result.push({
          question: this.questions[i].id,
          answer:
            this.questions[i].answer == '' || this.questions[i].answer == null
              ? null
              : toHTML(this.questions[i].answer),
        });
      }
    }

    this.isLoading = true;
    this.http
      .post('https://api.alphakonstruksi.id/test', result, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('authorization'),
        },
      })
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.snackBar.open(
            'Berhasil mengisi jawaban ujian. Terima kasih atas waktunya.',
            'Tutup',
            {
              duration: 1000,
            }
          );

          this.router.navigate(['/']);
        },
      });
  }
}
