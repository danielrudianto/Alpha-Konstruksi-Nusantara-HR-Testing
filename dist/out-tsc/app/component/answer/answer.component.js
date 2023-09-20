import { __decorate, __param } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, } from '@angular/material/bottom-sheet';
import { environment } from 'src/environments/environment';
export let AnswerComponent = class AnswerComponent {
    constructor(sheet, data, http, snackBar, router) {
        this.sheet = sheet;
        this.data = data;
        this.http = http;
        this.snackBar = snackBar;
        this.router = router;
        this.isSubmitting = false;
        this.formGroup = new FormGroup({
            answer: new FormControl('', Validators.required),
        });
    }
    ngOnInit() {
        this.formGroup.setValue({
            answer: this.data.answer,
        });
    }
    submitAnswer() {
        this.isSubmitting = true;
        this.formGroup.disable();
        this.http
            .post(`${environment.apiURL}test`, {
            questionID: this.data.id,
            answer: this.formGroup.controls['answer'].value,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('authorization')}`,
                'Access-Control-Allow-Origin': '*',
            }),
        })
            .subscribe({
            next: (_) => {
                this.isSubmitting = false;
                this.formGroup.enable();
                this.sheet.dismiss(this.formGroup.controls['answer'].value);
            },
            error: (error) => {
                if (error.status == 401) {
                    localStorage.removeItem('authorization');
                    this.snackBar.open('Mohon maaf token anda tidak valid. Silahkan coba lagi.', 'Tutup', {
                        duration: 1000,
                    });
                    this.sheet.dismiss();
                    this.router.navigate(['/']);
                    return;
                }
                this.isSubmitting = false;
                this.formGroup.enable();
                this.snackBar.open('Mohon maaf ada kesalahan. Silahkan dicoba kembali.', 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    onFileChange(event) {
        // Change to Base64 pdf
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.formGroup.controls['answer'].setValue(reader.result);
        };
    }
};
AnswerComponent = __decorate([
    Component({
        selector: 'app-answer',
        templateUrl: './answer.component.html',
        styleUrls: ['./answer.component.css'],
    }),
    __param(1, Inject(MAT_BOTTOM_SHEET_DATA))
], AnswerComponent);
//# sourceMappingURL=answer.component.js.map