import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {
  humi: any[];   // humidity
  lastH: any;
  chartHumidity = [];

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

  constructor(private db: AngularFireDatabase) {

      this.getHumi();
    }

  ngOnInit() {
    this.chartHumi();
  }

 getHumi() {
    this.db.list('/DHT22/Humidity').valueChanges().subscribe(humi => {
      this.humi = humi;
      console.log(this.humi[this.humi.length - 1]);
      this.lastH = this.humi[this.humi.length - 1];
    });
  }

  chartHumi(){
    const lastElements = 50;
// tslint:disable-next-line: variable-name
    firebase.database().ref('timestamped_humi').limitToLast(lastElements).on('value', ts_measures => {
  let timestampsHumi = [];
  let valuesHumi = [];
  ts_measures.forEach(ts_measure => {
      timestampsHumi.push(moment(ts_measure.val().timestamp).format('YYYY-MM-DD HH:mm:ss'));
      valuesHumi.push(ts_measure.val().value);
  });

  this.chartHumidity = new Chart('canvas', {
    type: 'line',
    data: {
      labels: timestampsHumi,
      datasets: [
        {
          data: valuesHumi,
          backgroundColor: 'rgba(0,0,0,1)',
          borderColor: 'rgba(51, 186, 255 )',
          fill: false
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
          scaleLabel: {
            display: true,
            labelString: 'Czas'
          },
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Wilgotność [%]'
          },
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
