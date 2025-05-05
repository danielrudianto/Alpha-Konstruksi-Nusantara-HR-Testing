import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionEssayComponent } from './create-question-essay.component';

describe('CreateQuestionEssayComponent', () => {
  let component: CreateQuestionEssayComponent;
  let fixture: ComponentFixture<CreateQuestionEssayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateQuestionEssayComponent]
    });
    fixture = TestBed.createComponent(CreateQuestionEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
