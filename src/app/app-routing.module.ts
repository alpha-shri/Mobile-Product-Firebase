import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { NewLaunchComponent } from './components/new-launch/new-launch.component';

const routes: Routes = [
  
  {
    path: 'newproduct',
    component: NewLaunchComponent
  },
  {
    path: 'productdetails',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }