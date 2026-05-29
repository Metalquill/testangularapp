import { Routes } from '@angular/router';
import { WeatherComponent } from './component/weather/weather.component';
import { TestarooneyComponent } from './component/testarooney/testarooney.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: 'testarooney', component: TestarooneyComponent },
  { path: '', redirectTo: '/testarooney', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
