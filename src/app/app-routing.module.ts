import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TempHumiComponent} from './tempHumi/tempHumi.component';


const routes: Routes = [
  {path: 'tempHumi', component: TempHumiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
