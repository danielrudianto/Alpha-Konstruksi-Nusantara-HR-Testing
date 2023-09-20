import { TestBed } from '@angular/core/testing';
import { SuccessPageComponent } from './success-page.component';
describe('SuccessPageComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SuccessPageComponent]
        });
        fixture = TestBed.createComponent(SuccessPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=success-page.component.spec.js.map