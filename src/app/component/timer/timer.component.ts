import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input('end') end!: Date;

  remainingTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  timer: any;

  constructor() {}

  startCountdown() {
    this.timer = setInterval(() => {
      this.remainingTime -= 1;
      this.minutes = Math.floor(this.remainingTime / 60);
      this.seconds = this.remainingTime % 60;
    }, 1000);
  }

  ngOnInit(): void {
    const currentTime = new Date();
    const offset = currentTime.getTimezoneOffset() / 60;
    currentTime.setMinutes(currentTime.getMinutes() + offset);

    this.remainingTime = Math.ceil(
      (this.end.getTime() - currentTime.getTime()) / 1000
    );
    this.startCountdown();
  }
}
