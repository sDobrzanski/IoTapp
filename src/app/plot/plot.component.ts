import { Component, OnInit, ViewChild } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as moment from 'moment';
import {Plotly} from 'plotly.js';
import * as firebase from 'firebase';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
   }

  ngOnInit() {
    const lastElements = 300;
    // tslint:disable-next-line: variable-name
    firebase.database().ref('timestamped_humi').limitToLast(lastElements).on('value', ts_measures => {
     
      let timestamps = [];
      let values = [];
      ts_measures.forEach(ts_measure => {
          //console.log(ts_measure.val().timestamp, ts_measure.val().value);
          timestamps.push(moment(ts_measure.val().timestamp).format('YYYY-MM-DD HH:mm:ss'));
          values.push(ts_measure.val().value);
      });
     // const myPlotDiv = document.getElementById('myPlot');

      const data = [{
          x: timestamps,
          y: values
      }];
  
      const layout = {
          title: '<b>Humidity live plot</b>',
          titlefont: {
              family: 'Courier New, monospace',
              size: 16,
              color: '#000'
          },
          xaxis: {
              linecolor: 'black',
              linewidth: 2
          },
          yaxis: {
              title: '<b>10-bit value</b>',
              titlefont: {
                  family: 'Courier New, monospace',
                  size: 14,
                  color: '#000'
              },
              linecolor: 'black',
              linewidth: 2,
          },
          margin: {
              r: 50,
              pad: 0
          }
      }

     // Plotly.newPlot(myPlotDiv, data, layout, { responsive: true });
  });
  }

}

