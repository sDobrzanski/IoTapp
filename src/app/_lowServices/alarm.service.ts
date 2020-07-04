import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  intensity: any[];
  lastI: any;
  alertG: boolean;
constructor(private db: AngularFireDatabase) { }

// tslint:disable-next-line: typedef
gasAlert(alertG) {
  this.db.list('/MQ2/Gas').valueChanges().subscribe(intensity => {
    this.intensity = intensity;
    console.log(this.intensity[this.intensity.length - 1]);
    this.lastI = this.intensity[this.intensity.length - 1];
    if (this.lastI >= 570)
    {
    alertG = true;
    console.log(alertG);
    return alertG;
    }
    else {
    alertG = false;
    console.log(alertG);
    return alertG;
         }
      });

    }
}
