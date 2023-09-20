import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckAnswerComponent } from './page/check-answer/check-answer.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { InformationComponent } from './page/information/information.component';
import { LoginComponent } from './page/login/login.component';
import { PreliminaryComponent } from './page/preliminary/preliminary.component';
import { QuizComponent } from './page/quiz/quiz.component';
import { SuccessPageComponent } from './page/success-page/success-page.component';
const routes = [
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
        path: 'Dashboard',
        component: DashboardComponent,
        data: { animationState: 3 },
    },
    {
        path: 'Check/:token',
        component: CheckAnswerComponent,
        data: { animationState: 4 },
    },
];
export let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    })
], AppRoutingModule);
//# sourceMappingURL=app-routing.module.js.map