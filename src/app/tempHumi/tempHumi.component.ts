import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {LightControlService} from 'src/app/_lowServices/lightControl.service';
import {WakeMeUpService} from 'src/app/_highServices/wakeMeUp.service';
import { interval, Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-tempHumi',
  templateUrl: './tempHumi.component.html',
  styleUrls: ['./tempHumi.component.css']
})
export class TempHumiComponent implements OnInit {

  intensity: any[];
  lastI: any;
  alertGs: boolean;
  alertGd: boolean;
  alertGi: boolean;


  constructor(private db: AngularFireDatabase, private lightControl: LightControlService,
              private timeControlLight: WakeMeUpService) {
    }

  ngOnInit() {
    this.gasAlert();
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
