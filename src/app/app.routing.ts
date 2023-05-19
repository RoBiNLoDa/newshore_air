import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InicioComponent } from './components/inicio/inicio.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: '**', component: InicioComponent }
]

export const appRoutingProviders: any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);