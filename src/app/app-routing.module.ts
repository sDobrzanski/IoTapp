import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TempHumiComponent} from './tempHumi/tempHumi.component';
import {HumidityComponent} from './humidity/humidity.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {LightComponent} from './light/light.component';
import {InfoComponent} from './info/info.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: TempHumiComponent},
  {path: 'humidity', component: HumidityComponent },
  {path: 'temperature', component: TemperatureComponent },
  {path: 'light', component: LightComponent },
  {path: 'info', component: InfoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
