import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { VideoElement } from 'src/app/interfaces/videoElement.interface';
import { environment } from 'src/environments/environment';
import Peer from 'peerjs';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  displayedName: string = "Daniel Tri";
  videos: VideoElement[] = [];

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
  ){}

  ngOnInit(): void {
    const myPeer = new Peer({
      host: environment.peerURL,
      port: 9000,
      path: "peerjs"
    });

    this.route.params.subscribe((params: any) => {
      const roomID = params.token;

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        console.info(`[info]: Successfully connected audio and video.`);
        // Stream the video
        this.socket.emit("join-room", {
          roomID: roomID,
          peerID: myPeer.id,
        })

        this.addVideo(stream);
        this.socket.on("on-join-room", (data: any) => {
          const candidateRoomID = data.roomID;
          const candidatePeerID = data.peerID;
          if(candidateRoomID == roomID){
            // Joining this room
            myPeer.call(candidatePeerID, stream);
          }
        })
        return;
      }).catch((error) => {
        console.error(`[error]: Error on retrieving user media: ${error}`);
        return;
      });
    })




  }

  addVideo(stream: MediaStream){
    this.videos.push({
      muted: true,
      srcObject: stream,
      displayName: "Daniel Tri",
    })
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
}
