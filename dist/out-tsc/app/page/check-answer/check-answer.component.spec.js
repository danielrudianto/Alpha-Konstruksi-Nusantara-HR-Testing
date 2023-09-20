import { TestBed } from '@angular/core/testing';
import { CheckAnswerComponent } from './check-answer.component';
describe('CheckAnswerComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CheckAnswerComponent]
        });
        fixture = TestBed.createComponent(CheckAnswerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=check-answer.component.spec.js.map