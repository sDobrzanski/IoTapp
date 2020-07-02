import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import * as moment from 'moment';
import { PlotlyModule } from 'angular-plotly.js'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { TempHumiComponent } from './tempHumi/tempHumi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotComponent } from './plot/plot.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      TempHumiComponent,
      PlotComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      BrowserAnimationsModule,
      PlotlyModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
