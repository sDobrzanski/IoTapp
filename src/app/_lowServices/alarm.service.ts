import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  intensity: any[];
  lastI: any;
constructor(private db: AngularFireDatabase) { }

// tslint:disable-next-line: typedef
gasAlert(alertGd: boolean, alertGs: boolean, alertGi: boolean) {
  this.db.list('/MQ2/Gas').valueChanges().subscribe(intensity => {
    this.intensity = intensity;
    console.log(this.intensity[this.intensity.length - 1]);
    this.lastI = this.intensity[this.intensity.length - 1];
    if (this.lastI >= 600)
      {
      alertGd = true;
      alertGs = false;
      alertGi = false;
      }
      else if (this.lastI < 600 && this.lastI >= 580) {
      alertGd = false;
      alertGi = true;
      alertGs = false;
           } else {
      alertGd = false;
      alertGi = false;
      alertGs = true;
           }
      });

    }
}
