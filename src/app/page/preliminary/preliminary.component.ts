import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { environment } from 'src/environments/environment';
import { TokenInputComponent } from '../../component/token-input/token-input.component';

@Component({
  selector: 'app-preliminary',
  templateUrl: './preliminary.component.html',
  styleUrls: ['./preliminary.component.css'],
})
export class PreliminaryComponent implements OnInit {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  languageFormGroup: FormGroup = new FormGroup({
    language: new FormControl('id', [Validators.required]),
  });

  preliminaryFormGroup: FormGroup = new FormGroup({
    device: new FormControl(false, [Validators.requiredTrue]),
    internet: new FormControl(false, [Validators.requiredTrue]),
  });

  ngOnInit(): void {
    Aos.init();
    this.languageFormGroup.controls['language'].valueChanges.subscribe(
      (value) => {
        if (value === 'en') {
          this.router.navigate(['/en']);
        } else {
          this.router.navigate(['/']);
        }
      }
    );
  }

  openTokenInput() {
    this.dialog
      .open(TokenInputComponent, {})
      .afterClosed()
      .subscribe((data) => {
        if (data != null && data != '') {
          const authorization = data.token;
          const submittedCV = data.submittedCV;
          const submittedTest = data.submittedTest;

          if (!submittedTest && submittedCV) {
            localStorage.setItem('authorization', authorization);
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
            this.router.navigate(['/Information']);
            return;
          }
        }
      });
  }
}
