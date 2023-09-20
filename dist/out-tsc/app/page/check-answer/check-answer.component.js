import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
export let CheckAnswerComponent = class CheckAnswerComponent {
    constructor(http, route, snackBar, router) {
        this.http = http;
        this.route = route;
        this.snackBar = snackBar;
        this.router = router;
        this.curriculum = null;
        this.answers = [];
        this.isLoading = true;
    }
    ngOnInit() {
        const token = this.route.snapshot.params['token'];
        this.http
            .get(`${environment.apiURL}result/check-answer/${token}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authorization')}`,
            },
        })
            .subscribe({
            next: (data) => {
                this.curriculum = data.curriculum;
                this.answers = data.data;
                this.isLoading = false;
            },
            error: (error) => {
                this.isLoading = false;
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
                if (error.status == 401) {
                    this.router.navigate(['/Login']);
                    localStorage.clear();
                }
                else {
                    this.router.navigate(['/Dashboard']);
                }
            },
        });
    }
    updateScore(event, index) {
        this.http
            .put(`${environment.apiURL}result/update-score`, {
            id: this.answers[index].id,
            token: this.route.snapshot.params['token'],
            score: event,
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authorization')}`,
            },
        })
            .subscribe({
            next: (_) => { },
            error: (error) => {
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    save() {
        this.http
            .post(`${environment.apiURL}test/check`, {
            token: this.route.snapshot.params['token'],
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authorization')}`,
            },
        })
            .subscribe({
            next: (_) => {
                this.snackBar.open('Berhasil menyimpan jawaban', 'Tutup', {
                    duration: 1000,
                });
                this.router.navigate(['/Dashboard']);
            },
            error: (error) => {
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    downloadFile(event) {
        var a = document.createElement('a'); //Create <a>
        a.href = event.data; //Image Base64 Goes here
        a.download = event.name; //File name Here
        a.click(); //Downloaded file
    }
};
CheckAnswerComponent = __decorate([
    Component({
        selector: 'app-check-answer',
        templateUrl: './check-answer.component.html',
        styleUrls: ['./check-answer.component.css'],
    })
], CheckAnswerComponent);
//# sourceMappingURL=check-answer.component.js.map