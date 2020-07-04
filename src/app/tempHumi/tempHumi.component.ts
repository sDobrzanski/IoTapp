import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import {WakeMeUpService} from 'src/app/_highServices/wakeMeUp.service';
import {AlarmService} from 'src/app/_lowServices/alarm.service';
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
  intensity: any[];
  lastI: any;
  lastH: any;
  lastT: any;
  alertG: boolean;
  today = Date.now();
  timeToWake: number;
  timeToSleep: number;

    gaugeType1 = 'arch';
    gaugeLabel1 = 'Temperatura';
    gaugeAppendText1 = '*C';
    color1 = 'rgb(255, 94, 0)';
    color2 = 'rgb(47, 227, 255)';
    gaugeType2 = 'full';
    gaugeLabel2 = 'Wilgotność';
    gaugeAppendText2 = '%';
    thresholdConfig = {
      '-10': {color: 'white'},
      '0': {color: 'rgb(47, 227, 255)'},
      '10': {color: 'orange'},
      '30': {color: 'red'},
      '50': {color: 'red'},
  };

  constructor(private db: AngularFireDatabase, private lightControl: LightControlService,
              private timeControlLight: WakeMeUpService, private alarmService: AlarmService) {
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
    this.gasAlert();
  // this.alarmService.gasAlert(this.alertG);
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
  gasAlert() {
    this.db.list('/MQ2/Gas').valueChanges().subscribe(intensity => {
      this.intensity = intensity;
      console.log(this.intensity[this.intensity.length - 1]);
      this.lastI = this.intensity[this.intensity.length - 1];
      if (this.lastI >= 600)
      {
      this.alertG = true;
      console.log(this.alertG);
      }
      else {
      this.alertG = false;
      console.log(this.alertG);
           }
        });

      }
}
