import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    // Return '01' if the value is 1
    return value.toString().padStart(2, '0');
  }
}
