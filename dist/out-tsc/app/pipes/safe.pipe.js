import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
export let SafePipe = class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
};
SafePipe = __decorate([
    Pipe({
        name: 'safe',
    })
], SafePipe);
//# sourceMappingURL=safe.pipe.js.map