import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private snackBar: MatSnackBar) {}

  @Input('data') data: any;
  @Input('index') index!: number;
  @Input('length') length!: number;

  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() previous: EventEmitter<any> = new EventEmitter();

  html: any;

  nextQuestion() {
    this.next.emit(this.html);
  }

  previousQuestion() {
    this.previous.emit(this.html);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngOnChanges(): void {}

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Check file size, if it's bigger than 5MB, don't upload it
        if (file.size > 5000000) {
          this.snackBar.open(
            'Ukuran file terlalu besar. Maksimal 5MB.',
            'Tutup',
            {
              duration: 1000,
            }
          );
        } else {
          this.html = reader.result;
        }
      };
    }
  }
}
