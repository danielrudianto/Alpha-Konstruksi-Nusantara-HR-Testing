import { TestBed } from '@angular/core/testing';
import { AnswerDrawingComponent } from './answer-drawing.component';
describe('AnswerDrawingComponent', () => {
    let component;
    let fixture;
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
//# sourceMappingURL=answer-drawing.component.spec.js.map