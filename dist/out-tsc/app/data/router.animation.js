import { trigger, transition, style, query, animateChild, group, animate, } from '@angular/animations';
export const routeTransitionAnimations = trigger('triggerName', [
    // If the data is greater than the previous data, then the animation will be forward
    transition('1 => 2, 1 => 3, 1 => 4, 2 => 3, 2 => 4, 3 => 4', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
            }),
        ]),
        query(':enter', [style({ right: '-100%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ right: '100%', opacity: 0 })),
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ right: '0%', opacity: 1 })),
            ]),
        ]),
        query(':enter', animateChild()),
    ]),
    transition('2 => 1, 3 => 1, 4 => 1, 3 => 2, 4 => 2, 4 => 3', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            }),
        ]),
        query(':enter', [style({ left: '-100%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ left: '100%', opacity: 0 })),
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%', opacity: 1 })),
            ]),
        ]),
        query(':enter', animateChild()),
    ]),
]);
//# sourceMappingURL=router.animation.js.map