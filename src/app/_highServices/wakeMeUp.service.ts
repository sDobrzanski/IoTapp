import { Injectable } from '@angular/core';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WakeMeUpService {

  timeNow: number = Date.now();


constructor(private lightControl: LightControlService) { }

  wakeUp(timeToWake: number) {
    if (timeToWake === this.timeNow) {
      this.lightControl.turnOn();
    }
  }

  goToSleep(timeToSleep: number) {
    if (timeToSleep === this.timeNow) {
      this.lightControl.turnOff();
    }
  }

}
