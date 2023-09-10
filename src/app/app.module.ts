import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxEditorModule } from 'ngx-editor';
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

import { MatNativeDateModule } from '@angular/material/core';
import { TimerComponent } from './component/timer/timer.component';
import { QuestionTypeComponent } from './component/question-type/question-type.component';
import { InformationComponent } from './page/information/information.component';
import { AddExperienceComponent } from './page/information/add-experience/add-experience.component';
import { AddCertificationComponent } from './page/information/add-certification/add-certification.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestionCardComponent,
    PreliminaryComponent,
    QuizComponent,
    TimerComponent,
    QuestionTypeComponent,
    InformationComponent,
    AddExperienceComponent,
    AddCertificationComponent,
    ConfirmationDialogComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
