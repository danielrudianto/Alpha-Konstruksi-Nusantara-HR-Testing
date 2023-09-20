import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
export let DashboardComponent = class DashboardComponent {
    constructor(http, snackBar, router) {
        this.http = http;
        this.snackBar = snackBar;
        this.router = router;
        this.name = '';
        this.isFetchingCandidates = false;
        this.selectedMode = 'all';
        this.page = 1;
        this.candidates = [];
        this.candidateCount = 0;
    }
    ngOnInit() {
        this.name = localStorage.getItem('name') || '';
        this.fetchCandidates();
    }
    fetchCandidates(page = this.page) {
        this.page = page;
        this.isFetchingCandidates = true;
        this.http
            .get(`${environment.apiURL}result?page=${page}&mode=${this.selectedMode}`, {
            headers: new HttpHeaders({
                authorization: `Bearer ${localStorage.getItem('authorization')}` || '',
            }),
        })
            .subscribe({
            next: (data) => {
                if (this.page == 1) {
                    this.candidates = data.data.map((datum) => {
                        return {
                            ...datum,
                            age: new Date().getFullYear() -
                                new Date(datum.curriculum.dateOfBirth).getFullYear(),
                        };
                    });
                }
                else {
                    this.candidates = [
                        ...this.candidates,
                        ...data.data.map((datum) => {
                            return {
                                ...datum,
                                age: new Date().getFullYear() -
                                    new Date(datum.curriculum.dateOfBirth).getFullYear(),
                            };
                        }),
                    ];
                }
                this.candidateCount = data.count;
                this.isFetchingCandidates = false;
            },
            error: (error) => {
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    select(event) {
        this.selectedMode = event;
        this.fetchCandidates(1);
    }
    check(i) {
        this.router.navigate(['/Check/' + this.candidates[i]['token']['token']]);
    }
    interview(i) {
        this.http
            .post(`${environment.apiURL}test/interview`, {
            token: this.candidates[i]['token']['token'],
        }, {
            headers: new HttpHeaders({
                authorization: `Bearer ${localStorage.getItem('authorization')}` || '',
            }),
        })
            .subscribe({
            next: (data) => {
                this.candidates.splice(i, 1);
            },
            error: (error) => {
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    fail(i) {
        this.http
            .post(`${environment.apiURL}test/fail`, {
            token: this.candidates[i]['token']['token'],
        }, {
            headers: new HttpHeaders({
                authorization: `Bearer ${localStorage.getItem('authorization')}` || '',
            }),
        })
            .subscribe({
            next: (data) => {
                this.candidates.splice(i, 1);
            },
            error: (error) => {
                this.snackBar.open(error.error.message, 'Tutup', {
                    duration: 1000,
                });
            },
        });
    }
    onScroll() {
        this.page = this.page + 1;
        this.fetchCandidates(this.page);
    }
    copy(event) {
        // Copy to clipboard
        navigator.clipboard.writeText(event).then(() => {
            this.snackBar.open('Text copied to clipboard', 'Tutup', {
                duration: 1000,
            });
        });
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css'],
    })
], DashboardComponent);
//# sourceMappingURL=dashboard.component.js.map