import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { CreateQuestionChoiceComponent } from './create-question-choice/create-question-choice.component';
import { CreateQuestionEssayComponent } from './create-question-essay/create-question-essay.component';
import { SelectQuestionTypeComponent } from './select-question-type/select-question-type.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent {
  constructor(private dialog: MatDialog, private sheet: MatBottomSheet) {}

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  addQuestion() {
    const sheet = this.sheet.open(SelectQuestionTypeComponent);
    sheet.afterDismissed().subscribe({
      next: (data) => {
        if (data == 'essay') {
          const dialog = this.dialog.open(CreateQuestionEssayComponent, {});
          dialog.afterClosed().subscribe({
            next: (data) => {},
          });
        }

        if (data == 'choice') {
          const dialog = this.dialog.open(CreateQuestionChoiceComponent, {});
          dialog.afterClosed().subscribe({
            next: (data) => {},
          });
        }
      },
    });
  }

  removeQuestion(index: number) {
    // this.questions.removeAt(index);
  }
}
