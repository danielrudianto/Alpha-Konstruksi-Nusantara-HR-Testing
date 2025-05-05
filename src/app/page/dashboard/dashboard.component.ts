import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  name: string = '';
  isFetchingCandidates: boolean = false;
  selectedMode: string = 'all';
  page: number = 1;
  candidates: any[] = [];
  candidateCount: number = 0;

  isLastPage: boolean = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.fetchCandidates();
  }

  fetchCandidates(page: number = this.page) {
    this.page = page;
    this.isFetchingCandidates = true;
    this.http
      .get(
        `${environment.apiURL}result?page=${page}&mode=${this.selectedMode}`,
        {
          headers: new HttpHeaders({
            authorization:
              `Bearer ${localStorage.getItem('authorization')}` || '',
          }),
        }
      )
      .subscribe({
        next: (data: any) => {
          if (this.page == 1) {
            this.candidates = data.data.map((datum: any) => {
              return {
                ...datum,
                age:
                  new Date().getFullYear() -
                  new Date(datum.curriculum.dateOfBirth).getFullYear(),
              };
            });
          } else {
            this.candidates = [
              ...this.candidates,
              ...data.data.map((datum: any) => {
                return {
                  ...datum,
                  age:
                    new Date().getFullYear() -
                    new Date(datum.curriculum.dateOfBirth).getFullYear(),
                };
              }),
            ];
          }

          this.candidateCount = data.count;
          this.isFetchingCandidates = false;
          if (this.candidates.length < 10) {
            this.isLastPage = true;
          } else {
            this.isLastPage = false;
          }
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      });
  }

  select(event: string) {
    this.selectedMode = event;
    this.fetchCandidates(1);
  }

  check(i: number) {
    this.router.navigate(['/Check/' + this.candidates[i]['token']['token']]);
  }

  interview(i: number) {
    this.http
      .post(
        `${environment.apiURL}test/interview`,
        {
          token: this.candidates[i]['token']['token'],
        },
        {
          headers: new HttpHeaders({
            authorization:
              `Bearer ${localStorage.getItem('authorization')}` || '',
          }),
        }
      )
      .subscribe({
        next: (data: any) => {
          this.candidates.splice(i, 1);
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      });
  }

  fail(i: number) {
    this.http
      .post(
        `${environment.apiURL}test/fail`,
        {
          token: this.candidates[i]['token']['token'],
        },
        {
          headers: new HttpHeaders({
            authorization:
              `Bearer ${localStorage.getItem('authorization')}` || '',
          }),
        }
      )
      .subscribe({
        next: (data: any) => {
          this.candidates.splice(i, 1);
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, 'Tutup', {
            duration: 1000,
          });
        },
      });
  }

  onScroll() {
    if (this.isLastPage) return;

    this.page = this.page + 1;
    this.fetchCandidates(this.page);
  }

  copy(event: string) {
    // Copy to clipboard
    navigator.clipboard.writeText(event).then(() => {
      this.snackBar.open('Text copied to clipboard', 'Tutup', {
        duration: 1000,
      });
    });
  }
}
