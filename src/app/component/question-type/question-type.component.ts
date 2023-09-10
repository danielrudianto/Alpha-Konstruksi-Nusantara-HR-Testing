import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css'],
})
export class QuestionTypeComponent {
  @Input('types') types: string[] = [];
  @Input('length') length: number[] = [];
  @Input('index') index!: number;
}
