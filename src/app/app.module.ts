import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreliminaryComponent } from './page/preliminary/preliminary.component';
import { QuizComponent } from './page/quiz/quiz.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';

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
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';

import { MatNativeDateModule } from '@angular/material/core';
import { TimerComponent } from './component/timer/timer.component';
import { InformationComponent } from './page/information/information.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { TimePipe } from './pipes/time.pipe';
import { AnswerComponent } from './component/answer/answer.component';
import { SafePipe } from './pipes/safe.pipe';
import { SuccessPageComponent } from './page/success-page/success-page.component';
import { LoginComponent } from './page/login/login.component';
import { AnswerDrawingComponent } from './component/answer-drawing/answer-drawing.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CheckAnswerComponent } from './page/check-answer/check-answer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WebcamModule } from 'ngx-webcam';
import { InterviewDashboardComponent } from './page/interview-dashboard/interview-dashboard.component';
import { InterviewComponent } from './page/interview/interview.component';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PreliminaryComponent,
    QuizComponent,
    TimerComponent,
    InformationComponent,
    ConfirmationDialogComponent,
    TimePipe,
    SafePipe,
    AnswerComponent,
    SuccessPageComponent,
    LoginComponent,
    AnswerDrawingComponent,
    DashboardComponent,
    CheckAnswerComponent,
    InterviewDashboardComponent,
    InterviewComponent,
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
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSliderModule,
    InfiniteScrollModule,
    WebcamModule,
    SocketIoModule.forRoot({
      url: environment.apiURL,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
