import { TestBed } from '@angular/core/testing';
import { TimerComponent } from './timer.component';
describe('TimerComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TimerComponent]
        });
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=timer.component.spec.js.map