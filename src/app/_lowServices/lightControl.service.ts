import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class LightControlService {

lightStatus: string;

constructor(private db: AngularFireDatabase) { }

turnOn() {
 this.db.object('/').update({LIGHT_STATUS: 'ON'});
 console.log('light turned ON');
}

turnOff() {
  this.db.object('/').update({LIGHT_STATUS: 'OFF'});
  console.log('light turned OFF');
}

}
