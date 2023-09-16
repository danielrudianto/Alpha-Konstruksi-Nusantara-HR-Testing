import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BootstrapOptions,
  Component,
  Inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  isSubmitting: boolean = false;
  constructor(
    private sheet: MatBottomSheetRef<AnswerComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  formGroup: FormGroup = new FormGroup({
    answer: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.formGroup.setValue({
      answer: this.data.answer,
    });
  }

  submitAnswer() {
    this.isSubmitting = true;
    this.formGroup.disable();
    this.http
      .post(
        'https://api.alphakonstruksi.id/test',
        {
          questionID: this.data.id,
          answer: this.formGroup.controls['answer'].value,
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
          this.isSubmitting = false;
          this.formGroup.enable();
          this.sheet.dismiss(this.formGroup.controls['answer'].value);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formGroup.enable();

          this.snackBar.open(
            'Mohon maaf ada kesalahan. Silahkan dicoba kembali.',
            'Tutup',
            {
              duration: 1000,
            }
          );
        },
      });
  }

  onFileChange(event: any) {
    // Change to Base64 pdf
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      this.formGroup.controls['answer'].setValue(reader.result);
    };
  }
}
