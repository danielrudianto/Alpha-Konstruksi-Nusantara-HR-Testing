import { TestBed } from '@angular/core/testing';
import { QuestionCardComponent } from './question-card.component';
describe('QuestionCardComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [QuestionCardComponent]
        });
        fixture = TestBed.createComponent(QuestionCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=question-card.component.spec.js.map