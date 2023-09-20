import { TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
describe('QuizComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [QuizComponent]
        });
        fixture = TestBed.createComponent(QuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=quiz.component.spec.js.map