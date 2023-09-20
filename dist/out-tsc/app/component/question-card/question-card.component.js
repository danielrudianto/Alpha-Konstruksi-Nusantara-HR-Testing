import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
export let QuestionCardComponent = class QuestionCardComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.next = new EventEmitter();
        this.previous = new EventEmitter();
    }
    nextQuestion() {
        this.next.emit(this.html);
    }
    previousQuestion() {
        this.previous.emit(this.html);
    }
    ngOnInit() { }
    ngOnDestroy() { }
    ngOnChanges() { }
    onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Check file size, if it's bigger than 5MB, don't upload it
                if (file.size > 5000000) {
                    this.snackBar.open('Ukuran file terlalu besar. Maksimal 5MB.', 'Tutup', {
                        duration: 1000,
                    });
                }
                else {
                    this.html = reader.result;
                }
            };
        }
    }
};
__decorate([
    Input('data')
], QuestionCardComponent.prototype, "data", void 0);
__decorate([
    Input('index')
], QuestionCardComponent.prototype, "index", void 0);
__decorate([
    Input('length')
], QuestionCardComponent.prototype, "length", void 0);
__decorate([
    Output()
], QuestionCardComponent.prototype, "next", void 0);
__decorate([
    Output()
], QuestionCardComponent.prototype, "previous", void 0);
QuestionCardComponent = __decorate([
    Component({
        selector: 'app-question-card',
        templateUrl: './question-card.component.html',
        styleUrls: ['./question-card.component.css'],
    })
], QuestionCardComponent);
//# sourceMappingURL=question-card.component.js.map