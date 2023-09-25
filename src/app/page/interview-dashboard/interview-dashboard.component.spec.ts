import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDashboardComponent } from './interview-dashboard.component';

describe('InterviewDashboardComponent', () => {
  let component: InterviewDashboardComponent;
  let fixture: ComponentFixture<InterviewDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewDashboardComponent]
    });
    fixture = TestBed.createComponent(InterviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
