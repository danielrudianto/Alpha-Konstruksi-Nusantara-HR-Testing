import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
export let LoginComponent = class LoginComponent {
    constructor(http, snackBar, router) {
        this.http = http;
        this.snackBar = snackBar;
        this.router = router;
        this.isSubmitting = false;
        this.loginFormGroup = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }
    login() {
        this.isSubmitting = true;
        this.http
            .post(`${environment.apiURL}auth`, this.loginFormGroup.value, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        })
            .subscribe({
            next: (data) => {
                localStorage.setItem('authorization', data['token']);
                localStorage.setItem('name', data['name']);
                this.router.navigate(['/Dashboard']);
            },
            error: (error) => {
                this.snackBar.open('Mohon maaf terjadi kesalahan. Mohon coba kembali beberapa saat lagi.', 'Tutup', {
                    duration: 1000,
                });
                this.isSubmitting = false;
            },
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
    })
], LoginComponent);
//# sourceMappingURL=login.component.js.map