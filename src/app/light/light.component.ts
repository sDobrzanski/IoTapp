import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import {WakeMeUpService} from 'src/app/_highServices/wakeMeUp.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  intensity: any[];
  lastI: any;
  alertGs: boolean;
  alertGd: boolean;
  alertGi: boolean;
  timeToWake: any;
  timeToSleep: any;
  currentTime: any;
  interval: Subscription ;
  tsLightOn: any;
  tsLastlightOn: any;
  tsLightOff: any;
  tsLastlightOff: any;
  lightStatus: boolean;
  light: boolean;
  lightStatusString: any;
  constructor(private db: AngularFireDatabase, private lightControl: LightControlService,
              private timeControlLight: WakeMeUpService) {
      this.interval = interval(1000)
    .subscribe((val) => {
      this.getLightStatus();
     // this.wakeUp();
    //  this.goToSleep();
      this.pushLastLightOn();
      this.pushLastLightOff();
      }
    );
     }

  ngOnInit() {
    this.gasAlert();
    this.getLastLightOn();
    this.getLastLightOff();
  }

  getLightStatus() {
    this.db.list('/').valueChanges().subscribe(lightStat => {
      this.lightStatusString = lightStat;
      if (this.lightStatusString[1] === 'ON'){
        this.lightStatus = true;
      } else if (this.lightStatusString[1] === 'OFF') {
        this.lightStatus = false;
      }
    });
  }

  toggleLight() {
    if (!this.light) {
      this.turnOnLight();
    } else {
      this.turnOffLight();
    }
  }

  pushLastLightOn() {
    if (this.timeToWake !== this.tsLastlightOn) {
    this.db.list('/timeLightON').push(this.timeToWake );
    }
  }

  pushLastLightOff() {
    if (this.timeToSleep !== this.tsLastlightOff) {
    this.db.list('/timeLightOFF').push(this.timeToSleep );
    }
  }

  getLastLightOn() {
    this.db.list('/timeLightON').valueChanges().subscribe(tsLightOn => {
      this.tsLightOn = tsLightOn;
      this.tsLastlightOn = this.tsLightOn[this.tsLightOn.length - 1];

      this.timeToWake = this.tsLastlightOn;
    });
  }

  getLastLightOff() {
    this.db.list('/timeLightOFF').valueChanges().subscribe(tsLightOff => {
      this.tsLightOff = tsLightOff;
      this.tsLastlightOff = this.tsLightOff[this.tsLightOff.length - 1];

      this.timeToSleep = this.tsLastlightOff;
    });
  }

  turnOnLight() {
    this.lightControl.turnOn();
    this.lightStatus = true;
    this.light = true;
  }
  turnOffLight() {
    this.lightControl.turnOff();
    this.lightStatus = false;
    this.light = false;
  }

  gasAlert() {
    this.db.list('/MQ2/Gas').valueChanges().subscribe(intensity => {
      this.intensity = intensity;
      console.log(this.intensity[this.intensity.length - 1]);
      this.lastI = this.intensity[this.intensity.length - 1];
      if (this.lastI >= 600)
      {
      this.alertGd = true;
      this.alertGs = false;
      this.alertGi = false;
      }
      else if (this.lastI < 600 && this.lastI >= 580) {
      this.alertGd = false;
      this.alertGi = true;
      this.alertGs = false;
           } else {
      this.alertGd = false;
      this.alertGi = false;
      this.alertGs = true;
           }
        });

      }

/*
  wakeUp() {
    this.timeControlLight.wakeUp(this.currentTime, this.timeToWake);
  }
  goToSleep() {
    this.timeControlLight.goToSleep(this.currentTime, this.timeToSleep);
  }
 */

}
