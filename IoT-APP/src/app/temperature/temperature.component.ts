import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  temp: any[];
  lastT: any;
  chartTemperature = [];
  gaugeType1 = 'arch';

    gaugeLabel1 = 'Temperatura';
    gaugeAppendText1 = '\u00B0C';
    color1 = 'rgb(255, 94, 0)';
    backgroundColor = 'white';
    thresholdConfig = {
      '-10': {color: '#80ffff'},
      '0': {color: 'rgb(47, 227, 255)'},
      '10': {color: 'orange'},
      '30': {color: 'red'},
      '50': {color: 'red'},
  };
  constructor(private db: AngularFireDatabase) {
    this.getTemp();
   }

  ngOnInit() {
    this.chartTemp();
  }

  getTemp() {
    this.db.list('/DHT22/Temperature').valueChanges().subscribe(temp => {
      this.temp = temp;
      console.log(this.temp[this.temp.length - 1]);
      this.lastT = this.temp[this.temp.length - 1];
    });
  }

  chartTemp(){
    const lastElements = 50;
// tslint:disable-next-line: variable-name
    firebase.database().ref('timestamped_temp').limitToLast(lastElements).on('value', ts_measures => {
  let timestampsTemp = [];
  let valuesTemp = [];
  ts_measures.forEach(ts_measure => {
      timestampsTemp.push(moment(ts_measure.val().timestamp).format('YYYY-MM-DD HH:mm:ss'));
      valuesTemp.push(ts_measure.val().value);
  });

  this.chartTemperature = new Chart('canvas1', {
    type: 'line',
    data: {
      labels: timestampsTemp,
      datasets: [
        {
          data: valuesTemp,
          backgroundColor: 'rgb(172, 62, 85, 0.575)',
          borderColor: 'rgba(255, 31, 31, 1)',
          fill: true
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: { color: 'white' },
          scaleLabel: {
            display: true,
            labelString: 'Czas',
            fontColor: 'white',
          },
          ticks: {
            fontColor: 'white',
            fontSize: 12
           }
        }],
        yAxes: [{
          display: true,
          gridLines: { color: 'white' },
          scaleLabel: {
            display: true,
            labelString: 'Temperatura [\u00B0C]',
            fontColor: 'white',
          },
          ticks: {
            fontColor: 'white',
            fontSize: 12
           }
        }],
      }
    }
  });
},
error => {
  console.log(error);
});
}

}
