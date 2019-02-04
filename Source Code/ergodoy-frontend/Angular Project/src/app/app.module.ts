import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './navigation/main/main.component';

import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';



import { ReactiveFormsModule } from '@angular/forms';

import { CustomerComponent } from './components/customer/customer.component';
import { ConsumptionComponent } from './components/consumption/consumption.component';
import { AdviserComponent } from './components/adviser/adviser.component';
import { CardComponent } from './components/card/card.component';
import { CustomCurrencyPipe } from './util/customCurrencyPipe'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CustomerComponent,
    ConsumptionComponent,
    AdviserComponent,
    CardComponent,
    CustomCurrencyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TabMenuModule,
    ContextMenuModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CustomCurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
