import { TestBed } from '@angular/core/testing';
import { PreliminaryComponent } from './preliminary.component';
describe('PreliminaryComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PreliminaryComponent]
        });
        fixture = TestBed.createComponent(PreliminaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=preliminary.component.spec.js.map