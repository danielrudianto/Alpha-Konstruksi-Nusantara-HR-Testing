import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-select-question-type',
  templateUrl: './select-question-type.component.html',
  styleUrls: ['./select-question-type.component.css'],
})
export class SelectQuestionTypeComponent {
  constructor(private sheet: MatBottomSheetRef<SelectQuestionTypeComponent>) {}

  select(type: string) {
    this.sheet.dismiss(type);
  }
}
