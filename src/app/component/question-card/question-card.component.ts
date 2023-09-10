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
import { Editor, Toolbar } from 'ngx-editor';

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

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  html: any;

  nextQuestion() {
    this.next.emit(this.html);
  }

  previousQuestion() {
    this.previous.emit(this.html);
  }

  ngOnInit(): void {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnChanges(): void {
    this.editor.setContent(this.data.answer);
    this.html = this.data.answer;
  }

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
