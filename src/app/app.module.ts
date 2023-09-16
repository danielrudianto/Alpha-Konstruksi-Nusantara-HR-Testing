import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionCardComponent } from './component/question-card/question-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreliminaryComponent } from './page/preliminary/preliminary.component';
import { QuizComponent } from './page/quiz/quiz.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MatNativeDateModule } from '@angular/material/core';
import { TimerComponent } from './component/timer/timer.component';
import { InformationComponent } from './page/information/information.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { TimePipe } from './pipes/time.pipe';
import { AnswerComponent } from './component/answer/answer.component';
import { SafePipe } from './pipes/safe.pipe';
import { SuccessPageComponent } from './page/success-page/success-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionCardComponent,
    PreliminaryComponent,
    QuizComponent,
    TimerComponent,
    InformationComponent,
    ConfirmationDialogComponent,
    TimePipe,
    SafePipe,
    AnswerComponent,
    SuccessPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    MatDividerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
