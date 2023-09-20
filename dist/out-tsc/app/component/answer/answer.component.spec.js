import { TestBed } from '@angular/core/testing';
import { AnswerComponent } from './answer.component';
describe('AnswerComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AnswerComponent]
        });
        fixture = TestBed.createComponent(AnswerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=answer.component.spec.js.map