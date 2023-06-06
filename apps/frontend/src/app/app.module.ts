import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


import { HttpClientModule } from '@angular/common/http';
import { VentaComponent } from './vistas/venta/venta.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
