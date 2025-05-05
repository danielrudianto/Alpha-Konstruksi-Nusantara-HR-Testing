import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestionTypeComponent } from './select-question-type.component';

describe('SelectQuestionTypeComponent', () => {
  let component: SelectQuestionTypeComponent;
  let fixture: ComponentFixture<SelectQuestionTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectQuestionTypeComponent]
    });
    fixture = TestBed.createComponent(SelectQuestionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
