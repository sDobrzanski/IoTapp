import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TempHumiComponent} from './tempHumi/tempHumi.component';
import {PlotComponent} from './plot/plot.component';


const routes: Routes = [
  {path: 'tempHumi', component: TempHumiComponent},
  {path: 'plot', component: PlotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
