import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignallingService {

  constructor(
    private socket: Socket
  ) { }

  getMessages(): Observable<any> {
    return this.socket.fromEvent("room");
  }

  sendMessages(payload: any): Observable<any> {
    return this.socket.emit("join-room", payload)
  }
}
