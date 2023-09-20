import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';
import { environment } from 'src/environments/environment';
export let PreliminaryComponent = class PreliminaryComponent {
    constructor(router, http, snackBar) {
        this.router = router;
        this.http = http;
        this.snackBar = snackBar;
        this.isSubmitting = false;
        this.formGroup = new FormGroup({
            token: new FormControl('', [Validators.required, Validators.minLength(1)]),
        });
    }
    submit() {
        this.isSubmitting = true;
        // this.router.navigate(['/Information']);
        this.http
            .post(`${environment.apiURL}token/check`, {
            token: this.formGroup.controls['token'].value,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        })
            .subscribe({
            next: (data) => {
                const authorization = data.token;
                const submittedCV = data.submittedCV;
                const submittedTest = data.submittedTest;
                console.log(data);
                if (!submittedTest && submittedCV) {
                    localStorage.setItem('authorization', authorization);
                    this.isSubmitting = false;
                    this.router.navigate(['/Quiz']);
                    return;
                }
                if (submittedCV && submittedTest) {
                    this.snackBar.open('Anda sudah pernah mengikuti test ini', 'Tutup', {
                        duration: 1000,
                    });
                    return;
                }
                if (!submittedCV && !submittedTest) {
                    localStorage.setItem('authorization', authorization);
                    this.isSubmitting = false;
                    this.router.navigate(['/Information']);
                    return;
                }
            },
            error: (error) => {
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        })
            .add(() => {
            this.isSubmitting = false;
        });
    }
    ngOnInit() {
        Aos.init();
    }
};
PreliminaryComponent = __decorate([
    Component({
        selector: 'app-preliminary',
        templateUrl: './preliminary.component.html',
        styleUrls: ['./preliminary.component.css'],
    })
], PreliminaryComponent);
//# sourceMappingURL=preliminary.component.js.map