import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
export let InformationComponent = class InformationComponent {
    constructor(dialog, router, http, snackBar) {
        this.dialog = dialog;
        this.router = router;
        this.http = http;
        this.snackBar = snackBar;
        this.maxDate = new Date();
        this.minDate = new Date();
        this.isSubmitting = false;
        this.metaFormGroup = new FormGroup({
            name: new FormControl('', Validators.required),
            nickName: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            dateOfBirth: new FormControl('', Validators.required),
        });
    }
    ngOnInit() {
        // Maximum date is 18 years ago
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
        // Minimum date is 50 years ago
        this.minDate.setFullYear(this.minDate.getFullYear() - 50);
    }
    submit() {
        this.isSubmitting = true;
        this.http
            .post(`${environment.apiURL}curriculum`, {
            name: this.metaFormGroup.controls['name'].value,
            nickName: this.metaFormGroup.controls['nickName'].value,
            phoneNumber: this.metaFormGroup.controls['phoneNumber'].value,
            email: this.metaFormGroup.controls['email'].value,
            address: this.metaFormGroup.controls['address'].value,
            city: this.metaFormGroup.controls['city'].value,
            dateOfBirth: this.metaFormGroup.controls['dateOfBirth'].value,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('authorization')}`,
                'Access-Control-Allow-Origin': '*',
            }),
        })
            .subscribe({
            next: (_) => {
                this.router.navigate(['/Quiz']);
            },
            error: (error) => {
                console.log(error);
                this.isSubmitting = false;
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        })
            .add(() => { });
    }
};
InformationComponent = __decorate([
    Component({
        selector: 'app-information',
        templateUrl: './information.component.html',
        styleUrls: ['./information.component.css'],
    })
], InformationComponent);
//# sourceMappingURL=information.component.js.map