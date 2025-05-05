import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAnswerComponent } from './page/check-answer/check-answer.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { InformationComponent } from './page/information/information.component';
import { LoginComponent } from './page/login/login.component';
import { PreliminaryComponent } from './page/preliminary/preliminary.component';
import { QuizComponent } from './page/quiz/quiz.component';
import { SuccessPageComponent } from './page/success-page/success-page.component';
import { AdministratorComponent } from './page/administrator/administrator.component';
import { TestComponent } from './page/test/test.component';
import { TestDashboardComponent } from './page/test/test-dashboard/test-dashboard.component';
import { CreateTestComponent } from './page/test/create-test/create-test.component';

const routes: Routes = [
  {
    path: '',
    component: PreliminaryComponent,
    data: { animationState: 1 },
  },
  {
    path: 'Information',
    component: InformationComponent,
    data: { animationState: 2 },
  },
  {
    path: 'Quiz',
    component: QuizComponent,
    data: { animationState: 3 },
  },
  {
    path: 'Success',
    component: SuccessPageComponent,
    data: { animationState: 4 },
  },
  {
    path: 'Login',
    component: LoginComponent,
    data: { animationState: 2 },
  },
  {
    path: 'Administrator',
    component: AdministratorComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'Test',
        component: TestDashboardComponent,
        children: [
          {
            path: '',
            component: TestComponent,
          },
          {
            path: 'Create',
            component: CreateTestComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
