import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import {WakeMeUpService} from 'src/app/_highServices/wakeMeUp.service';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-tempHumi',
  templateUrl: './tempHumi.component.html',
  styleUrls: ['./tempHumi.component.css']
})
export class TempHumiComponent implements OnInit {

  humi: any[];   // humidity
  temp: any[];   // temperature
  lastH: any;
  lastT: any;
  today = Date.now();
  timeToWake: number;
  timeToSleep: number;

  constructor(db: AngularFireDatabase, private lightControl: LightControlService, private timeControlLight: WakeMeUpService) {
    db.list('/DHT22/Humidity').valueChanges().subscribe(humi => {
      this.humi = humi;
      console.log(this.humi[this.humi.length - 1]);
      this.lastH = this.humi[this.humi.length - 1];
    });

    db.list('/DHT22/Temperature').valueChanges().subscribe(temp => {
      this.temp = temp;
      console.log(this.temp[this.temp.length - 1]);
      this.lastT = this.temp[this.temp.length - 1];
    });
    }

  ngOnInit() {
  }


  turnOnLight() {
    this.lightControl.turnOn();
  }
  turnOffLight() {
    this.lightControl.turnOff();
  }

  wakeUp() {
    this.timeControlLight.wakeUp(this.timeToWake);
  }
  goToSleep() {
    this.timeControlLight.goToSleep(this.timeToSleep);
  }

}
