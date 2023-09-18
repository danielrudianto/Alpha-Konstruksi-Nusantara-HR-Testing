import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnswerDrawingComponent } from 'src/app/component/answer-drawing/answer-drawing.component';
import { AnswerComponent } from 'src/app/component/answer/answer.component';
import { ConfirmationDialogComponent } from 'src/app/component/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  index: number = 0;
  endTime: Date | null = null;

  isLoading: boolean = false;

  questionTypes: string[] = [
    'Civil Engineering',
    'Geotechnical Engineering',
    'Drawing',
  ];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private sheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.http
      .get(`${environment.apiURL}test`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('authorization')}`,
          'Access-Control-Allow-Origin': '*',
        }),
      })
      .subscribe({
        next: (data: any) => {
          this.questions = data['questions'];
          // The expiredAt is in GMT+0, so we need to convert it to local time
          this.endTime = new Date(data['expiredAt']);
          const currentTime = new Date();

          const offset = currentTime.getTimezoneOffset() / 60;
          currentTime.setMinutes(currentTime.getMinutes() + offset);

          // If the test has expired, redirect to home page
          if (this.endTime.getTime() < currentTime.getTime()) {
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
  }

  get progress() {
    const pending = this.questions.filter(
      (question) => question.answer == null
    );

    return (
      ((this.questions.length - pending.length) / this.questions.length) * 100 +
      '%'
    );
  }

  openQuestion(index: number) {
    if (this.questions[index].type == 'drawing') {
      const sheet = this.sheet.open(AnswerDrawingComponent, {
        data: {
          id: this.questions[index].id,
          question: this.questions[index].question,
          attachment: this.questions[index].attachment,
          notes: this.questions[index].notes,
          answer: this.questions[index].answer,
          type: this.questions[index].type,
          files: this.questions[index].files,
        },
      });

      sheet.afterDismissed().subscribe((data) => {
        console.log(data);
        if (data) {
          this.questions[index].files = data.files;
        }
      });
    } else {
      const sheet = this.sheet.open(AnswerComponent, {
        data: {
          id: this.questions[index].id,
          question: this.questions[index].question,
          attachment: this.questions[index].attachment,
          notes: this.questions[index].notes,
          answer: this.questions[index].answer,
          type: this.questions[index].type,
        },
      });

      sheet.afterDismissed().subscribe((data) => {
        if (data) {
          this.questions[index].answer = data;
        }
      });
    }
  }

  openConfirmation() {
    const dialog = this.dialog.open(ConfirmationDialogComponent);
    dialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.submit();
      }
    });
  }

  submit() {
    this.http
      .post(
        `${environment.apiURL}test/end`,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('authorization'),
            'Access-Control-Allow-Origin': '*',
          }),
        }
      )
      .subscribe({
        next: (_) => {
          localStorage.removeItem('authorization');
          this.isLoading = false;
          this.snackBar.open(
            'Berhasil mengisi jawaban ujian. Terima kasih atas waktunya.',
            'Tutup',
            {
              duration: 1000,
            }
          );

          this.router.navigate(['/Success']);
        },
        error: (error) => {
          console.error(`[error]: ${error}`);
          localStorage.removeItem('authorization');
          this.isLoading = false;
          this.snackBar.open(
            'Berhasil mengisi jawaban ujian. Terima kasih atas waktunya.',
            'Tutup',
            {
              duration: 1000,
            }
          );

          this.router.navigate(['/Success']);
        },
      });
  }
}
