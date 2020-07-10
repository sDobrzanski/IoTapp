import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class LightControlService {

lightStatus: string;

constructor(private db: AngularFireDatabase) { }

// tslint:disable-next-line: typedef
turnOn() {
  this.lightStatus = 'ON';
  this.db.object('/').update({LIGHT_STATUS: this.lightStatus});
  console.log('light turned ON');
}

// tslint:disable-next-line: typedef
turnOff() {
  this.lightStatus = 'OFF';
  this.db.object('/').update({LIGHT_STATUS: this.lightStatus});
  console.log('light turned OFF');
}

}
