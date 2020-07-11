import { Injectable } from '@angular/core';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WakeMeUpService {


constructor(private lightControl: LightControlService) { }

    // tslint:disable-next-line: typedef
    wakeUp(currentTime = moment().format('YYYY-MM-DDTHH:mm'), wakeUpTime: any) {
        console.log(currentTime);
        console.log(wakeUpTime);
       if (wakeUpTime === currentTime) {
        this.lightControl.turnOn();
      }
    }

    // tslint:disable-next-line: typedef
    goToSleep(currentTime = moment().format('YYYY-MM-DDTHH:mm'), sleepTime: any) {
     // console.log(currentTime);
     // console.log(sleepTime);
      if (sleepTime === currentTime) {
        this.lightControl.turnOff();
      }
    }
}
