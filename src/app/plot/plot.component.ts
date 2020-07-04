import { Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})

export class PlotComponent implements OnInit {
    chartHumidity = [];
    chartTemperature = [];

  constructor() {
   }

  ngOnInit() {
      this.chartHumi();
      this.chartTemp();
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
              backgroundColor: 'rgba(0,0,0,1)',
              borderColor: 'rgba(255, 31, 31, 1)',
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
                labelString: 'Temperatura [*C]'
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

