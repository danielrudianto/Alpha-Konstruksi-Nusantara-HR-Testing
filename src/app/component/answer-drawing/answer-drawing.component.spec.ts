import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDrawingComponent } from './answer-drawing.component';

describe('AnswerDrawingComponent', () => {
  let component: AnswerDrawingComponent;
  let fixture: ComponentFixture<AnswerDrawingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerDrawingComponent]
    });
    fixture = TestBed.createComponent(AnswerDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
