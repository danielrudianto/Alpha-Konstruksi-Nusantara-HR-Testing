import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
export let TimerComponent = class TimerComponent {
    constructor(router, snackBar) {
        this.router = router;
        this.snackBar = snackBar;
        this.onSubmit = new EventEmitter();
        this.remainingTime = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
    submit() {
        this.onSubmit.emit();
    }
    get isNearEnd() {
        return this.remainingTime < 300;
    }
    startCountdown() {
        if (this.remainingTime <= 0) {
            this.snackBar.open('Waktu habis.', 'Tutup', {
                duration: 1000,
            });
            this.router.navigate(['/']);
        }
        this.timer = setInterval(() => {
            this.remainingTime -= 1;
            this.minutes = Math.floor(this.remainingTime / 60);
            this.seconds = this.remainingTime % 60;
            if (this.remainingTime <= 0) {
                this.minutes = 0;
                this.seconds = 0;
            }
        }, 1000);
    }
    ngOnInit() {
        const currentTime = new Date();
        this.remainingTime = Math.ceil((this.end.getTime() - currentTime.getTime()) / 1000);
        this.startCountdown();
    }
};
__decorate([
    Input('end')
], TimerComponent.prototype, "end", void 0);
__decorate([
    Output()
], TimerComponent.prototype, "onSubmit", void 0);
TimerComponent = __decorate([
    Component({
        selector: 'app-timer',
        templateUrl: './timer.component.html',
        styleUrls: ['./timer.component.css'],
    })
], TimerComponent);
//# sourceMappingURL=timer.component.js.map