import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { routeTransitionAnimations } from './data/router.animation';
export let AppComponent = class AppComponent {
    constructor() {
        this.title = 'alpha-konstruksi-nusantara-hr-testing';
    }
    prepareRoute(outlet) {
        return (outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData['animationState']);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        animations: [routeTransitionAnimations],
    })
], AppComponent);
//# sourceMappingURL=app.component.js.map