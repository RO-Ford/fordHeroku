import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximaleComponent } from './component/maximale/maximale.component';
import { MinimaleComponent } from './component/minimale/minimale.component';
import { AppComponent } from './app.component';
import { MinMaxComponent } from './component/min-max/min-max.component';


const routes: Routes = [
	{ path: '', redirectTo: '/ford', pathMatch: 'full' },
	{ path: "maximale", component: MinimaleComponent },
	{ path: "minimale", component: MaximaleComponent },
	{ path: "ford", component: MinMaxComponent },
	{ path: '**', component: MinMaxComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
