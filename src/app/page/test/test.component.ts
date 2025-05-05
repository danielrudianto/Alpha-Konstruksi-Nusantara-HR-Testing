import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  tests: any[] = [];
  page: number = 1;

  testCount: number = 0;
  isLoading: boolean = false;

  searchFormGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  fetchTests(page: number = this.page) {
    this.page = page;
    this.isLoading = true;

    this.http
      .get(`${environment.apiURL}administrator/test?page=${this.page}`, {
        headers: new HttpHeaders({
          authorization: `Bearer ${localStorage.getItem('authorization')}`,
        }),
      })
      .subscribe({
        next: (data: any) => {
          this.tests = data.tests;
          this.testCount = data.testCount;
          this.isLoading = false;
        },
      });
  }

  ngOnInit(): void {
    this.searchFormGroup.controls['search'].valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.isLoading = true;
        this.http
          .get(
            `${environment.apiURL}administrator/test?page=${this.page}&search=${value}`,
            {
              headers: new HttpHeaders({
                authorization: `Bearer ${localStorage.getItem(
                  'authorization'
                )}`,
              }),
            }
          )
          .subscribe({
            next: (data: any) => {
              this.tests = data.tests;
              this.testCount = data.testCount;
              this.isLoading = false;
            },
          });
      });
  }

  createTest() {
    this.router.navigate(['/Administrator/Test/Create']);
  }
}
