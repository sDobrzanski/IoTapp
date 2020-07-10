import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import {WakeMeUpService} from 'src/app/_highServices/wakeMeUp.service';
import {AlarmService} from 'src/app/_lowServices/alarm.service';
import { interval, Subscription } from 'rxjs';

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
  alertGs: boolean;
  alertGd: boolean;
  alertGi: boolean;
  today = Date.now();
  timeToWake: any;
  timeToSleep: any;
  currentTime: any;
  sub: Subscription ;

    gaugeType1 = 'arch';
    gaugeLabel1 = 'Temperatura';
    gaugeAppendText1 = '\u00B0C';
    color1 = 'rgb(255, 94, 0)';
    color2 = 'rgb(47, 227, 255)';
    gaugeType2 = 'full';
    gaugeLabel2 = 'Wilgotność';
    gaugeAppendText2 = '%';
    thresholdConfig = {
      '-10': {color: '#80ffff'},
      '0': {color: 'rgb(47, 227, 255)'},
      '10': {color: 'orange'},
      '30': {color: 'red'},
      '50': {color: 'red'},
  };

  constructor(private db: AngularFireDatabase, private lightControl: LightControlService,
              private timeControlLight: WakeMeUpService, private alarmService: AlarmService) {

    this.getTemp();
    this.getHumi();

    this.sub = interval(60000)
    .subscribe((val) => {
      this.wakeUp();
      this.goToSleep();
      }
    );

    }

  ngOnInit() {
    this.gasAlert();
  // this.alarmService.gasAlert(this.alertGd, this.alertGs, this.alertGi);
  }
  getTemp() {
    this.db.list('/DHT22/Temperature').valueChanges().subscribe(temp => {
      this.temp = temp;
      console.log(this.temp[this.temp.length - 1]);
      this.lastT = this.temp[this.temp.length - 1];
    });
  }

  getHumi() {
    this.db.list('/DHT22/Humidity').valueChanges().subscribe(humi => {
      this.humi = humi;
      console.log(this.humi[this.humi.length - 1]);
      this.lastH = this.humi[this.humi.length - 1];
    });
  }

  turnOnLight() {
    this.lightControl.turnOn();
  }
  turnOffLight() {
    this.lightControl.turnOff();
  }

  wakeUp() {
    this.timeControlLight.wakeUp(this.currentTime, this.timeToWake);
  }
  goToSleep() {
    this.timeControlLight.goToSleep(this.currentTime, this.timeToSleep);
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
}
