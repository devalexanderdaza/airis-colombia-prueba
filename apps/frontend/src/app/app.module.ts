import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RealStateComponent } from './real-state/real-state.component';
import { SharedComponent } from './shared/shared.component';
import { MapComponent } from './real-state/components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    RealStateComponent,
    SharedComponent,
    MapComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
