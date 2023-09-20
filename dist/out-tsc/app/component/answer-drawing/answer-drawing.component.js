import { __decorate, __param } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild, } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, } from '@angular/material/bottom-sheet';
import { environment } from 'src/environments/environment';
export let AnswerDrawingComponent = class AnswerDrawingComponent {
    constructor(sheet, data, http, snackBar, router) {
        this.sheet = sheet;
        this.data = data;
        this.http = http;
        this.snackBar = snackBar;
        this.router = router;
        this.file = new ElementRef(null);
        this.isSubmitting = false;
        this.answers = [];
    }
    onFileChange(event) {
        // Change to base64
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        const fileName = event.target.files[0].name;
        const fileSize = event.target.files[0].size;
        reader.onload = () => {
            this.answers.push({
                id: null,
                data: reader.result,
                name: fileName,
                size: fileSize,
            });
        };
        this.file.nativeElement.value = '';
    }
    removeFile(index) {
        this.answers.splice(index, 1);
    }
    submitAnswer() {
        this.isSubmitting = true;
        this.http
            .post(`${environment.apiURL}test/files`, {
            questionID: this.data.id,
            answer: null,
            files: this.answers,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('authorization')}`,
                'Access-Control-Allow-Origin': '*',
            }),
        })
            .subscribe({
            next: (response) => {
                this.isSubmitting = false;
                this.sheet.dismiss(response);
            },
            error: (error) => {
                this.isSubmitting = false;
                if (error.status == 401) {
                    localStorage.removeItem('authorization');
                    this.snackBar.open('Mohon maaf token anda tidak valid. Silahkan coba lagi.', 'Tutup', {
                        duration: 1000,
                    });
                    this.sheet.dismiss();
                    this.router.navigate(['/']);
                    return;
                }
                this.snackBar.open('Mohon maaf ada kesalahan. Silahkan dicoba kembali.', 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    ngOnInit() {
        this.answers = this.data.files;
    }
    closeDialog() {
        this.sheet.dismiss(undefined);
    }
};
__decorate([
    ViewChild('file')
], AnswerDrawingComponent.prototype, "file", void 0);
AnswerDrawingComponent = __decorate([
    Component({
        selector: 'app-answer-drawing',
        templateUrl: './answer-drawing.component.html',
        styleUrls: ['./answer-drawing.component.css'],
    }),
    __param(1, Inject(MAT_BOTTOM_SHEET_DATA))
], AnswerDrawingComponent);
//# sourceMappingURL=answer-drawing.component.js.map