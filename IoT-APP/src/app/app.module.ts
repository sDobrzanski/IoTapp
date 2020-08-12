import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import * as moment from 'moment';
import {FormsModule} from '@angular/forms';
import { NgxGaugeModule } from 'ngx-gauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { TempHumiComponent } from './tempHumi/tempHumi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HumidityComponent } from './humidity/humidity.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { LightComponent } from './light/light.component';
import { InfoComponent } from './info/info.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      TempHumiComponent,
      HumidityComponent,
      TemperatureComponent,
      LightComponent,
      InfoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      BrowserAnimationsModule,
      FormsModule,
      NgxGaugeModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
