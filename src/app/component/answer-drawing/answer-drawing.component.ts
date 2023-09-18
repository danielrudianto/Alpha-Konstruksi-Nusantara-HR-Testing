import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-answer-drawing',
  templateUrl: './answer-drawing.component.html',
  styleUrls: ['./answer-drawing.component.css'],
})
export class AnswerDrawingComponent implements OnInit {
  @ViewChild('file') file: ElementRef = new ElementRef(null);
  isSubmitting: boolean = false;
  constructor(
    private sheet: MatBottomSheetRef<AnswerDrawingComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  answers: any[] = [];

  onFileChange(event: any) {
    // Change to base64
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    const fileName = event.target.files[0].name;
    const fileSize = event.target.files[0].size;

    reader.onload = () => {
      this.answers.push({
        id: null,
        data: reader.result,
        name: fileName,
        size: fileSize,
      });
    };

    this.file.nativeElement.value = '';
  }

  removeFile(index: number) {
    this.answers.splice(index, 1);
  }

  submitAnswer() {
    this.isSubmitting = true;
    this.http
      .post(
        `${environment.apiURL}test/files`,
        {
          questionID: this.data.id,
          answer: null,
          files: this.answers,
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
        next: (response: any) => {
          this.isSubmitting = false;
          this.sheet.dismiss(response);
        },
        error: (error) => {
          this.isSubmitting = false;
          if (error.status == 401) {
            localStorage.removeItem('authorization');
            this.snackBar.open(
              'Mohon maaf token anda tidak valid. Silahkan coba lagi.',
              'Tutup',
              {
                duration: 1000,
              }
            );
            this.sheet.dismiss();
            this.router.navigate(['/']);
            return;
          }

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

  ngOnInit(): void {
    console.log(this.data);
    this.answers = this.data.files;
  }
}
