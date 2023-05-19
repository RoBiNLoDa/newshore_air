import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { DialogFlightComponent } from './components/dialog-flight/dialog-flight.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CityPipe } from './pipes/city.pipe';
import { CoinPipe } from './pipes/coin.pipe';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    VuelosComponent,
    DialogFlightComponent,
    CityPipe,
    CoinPipe
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule
    
  ],
  providers: [appRoutingProviders,],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
