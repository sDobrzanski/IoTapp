import { Injectable } from '@angular/core';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WakeMeUpService {

   timeNow = Date.now();
  // currentTime: number = moment.now();

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

/*
    wakeUp(wakeUpTime: moment.Moment = moment()) {
      if (wakeUpTime.isBetween(this.currentTime, this.currentTime)) {
        this.lightControl.turnOn();
      }
    }

    goToSleep(sleepTime: moment.Moment = moment()) {
      if (sleepTime.isBetween(this.currentTime, this.currentTime)) {
        this.lightControl.turnOff();
      }
    }
*/
}
