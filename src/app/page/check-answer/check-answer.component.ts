import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-check-answer',
  templateUrl: './check-answer.component.html',
  styleUrls: ['./check-answer.component.css'],
})
export class CheckAnswerComponent implements OnInit {
  curriculum: any = null;
  answers: any[] = [];
  isLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];
    this.http
      .get('http://localhost:5000/result/check-answer/' + token, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      })
      .subscribe({
        next: (data: any) => {
          this.curriculum = data.curriculum;
          this.answers = data.data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });

          if (error.status == 401) {
            this.router.navigate(['/Login']);
            localStorage.clear();
          } else {
            this.router.navigate(['/Dashboard']);
          }
        },
      });
  }

  updateScore(event: any, index: number) {
    this.http
      .put(
        'http://localhost:5000/result/update-score',
        {
          id: this.answers[index].id,
          token: this.route.snapshot.params['token'],
          score: event,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authorization')}`,
          },
        }
      )
      .subscribe({
        next: (_) => {},
        error: (error) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      });
  }

  save() {
    this.http
      .post(
        'http://localhost:5000/test/check',
        {
          token: this.route.snapshot.params['token'],
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authorization')}`,
          },
        }
      )
      .subscribe({
        next: (_) => {
          this.snackBar.open('Berhasil menyimpan jawaban', 'Tutup', {
            duration: 1000,
          });

          this.router.navigate(['/Dashboard']);
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      });
  }

  downloadFile(event: any) {
    var a = document.createElement('a'); //Create <a>
    a.href = event.data; //Image Base64 Goes here
    a.download = event.name; //File name Here
    a.click(); //Downloaded file
  }
}
