import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystemUnitComponent } from './system-unit/system-unit.component';
import { PeripheralsComponent } from './peripherals/peripherals.component';
import { CallComponent } from './call/call.component';
import { NetworkComponent } from './network/network.component';
import { SystemTimeComponent } from './system-time/system-time.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayComponent } from './display/display.component';

import { NavbarComponent } from './navbar/navbar.component';
import { XmlService } from './xml.service';
import { CapabilitiesComponent } from './capabilities/capabilities.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'display', component: DisplayComponent},
  {path: ' ', redirectTo:  'dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SystemUnitComponent,
    PeripheralsComponent,
    CallComponent,
    NetworkComponent,
    SystemTimeComponent,
    ContactInfoComponent,
    DashboardComponent,
    DisplayComponent,
    NavbarComponent,
    CapabilitiesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    // AppRoutingModule,
    // Add line below:
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [XmlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
