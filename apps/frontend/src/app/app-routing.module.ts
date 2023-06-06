import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealStateComponent } from './real-state/real-state.component';

const routes: Routes = [{ path: '', component: RealStateComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
