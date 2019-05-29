import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [	

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false , enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
