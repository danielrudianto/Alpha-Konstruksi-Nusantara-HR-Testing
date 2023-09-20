import { __decorate } from "tslib";
import { Component } from '@angular/core';
export let ConfirmationDialogComponent = class ConfirmationDialogComponent {
    constructor(dialog) {
        this.dialog = dialog;
    }
    submit() {
        this.dialog.close(true);
    }
    close() {
        this.dialog.close(false);
    }
};
ConfirmationDialogComponent = __decorate([
    Component({
        selector: 'app-confirmation-dialog',
        templateUrl: './confirmation-dialog.component.html',
        styleUrls: ['./confirmation-dialog.component.css'],
    })
], ConfirmationDialogComponent);
//# sourceMappingURL=confirmation-dialog.component.js.map