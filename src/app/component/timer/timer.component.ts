import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input('end') end!: Date;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  remainingTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  timer: any;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  submit() {
    this.onSubmit.emit();
  }

  get isNearEnd() {
    return this.remainingTime < 300;
  }

  startCountdown() {
    if (this.remainingTime <= 0) {
      this.snackBar.open('Waktu habis.', 'Tutup', {
        duration: 1000,
      });
      this.router.navigate(['/']);
    }

    this.timer = setInterval(() => {
      this.remainingTime -= 1;
      this.minutes = Math.floor(this.remainingTime / 60);
      this.seconds = this.remainingTime % 60;

      if (this.remainingTime <= 0) {
        this.minutes = 0;
        this.seconds = 0;
      }
    }, 1000);
  }

  ngOnInit(): void {
    const currentTime = new Date();
    const offset = currentTime.getTimezoneOffset() / 60;
    currentTime.setMinutes(currentTime.getMinutes() - offset);

    this.remainingTime = Math.ceil(
      (this.end.getTime() - currentTime.getTime()) / 1000
    );
    this.startCountdown();
  }
}
