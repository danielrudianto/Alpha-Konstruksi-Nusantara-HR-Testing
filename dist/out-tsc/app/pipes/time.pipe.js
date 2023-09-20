import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
export let TimePipe = class TimePipe {
    transform(value) {
        // Return '01' if the value is 1
        return value.toString().padStart(2, '0');
    }
};
TimePipe = __decorate([
    Pipe({ name: 'time' })
], TimePipe);
//# sourceMappingURL=time.pipe.js.map