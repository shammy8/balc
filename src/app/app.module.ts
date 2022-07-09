import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

import { ConfirmationService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DividerModule } from 'primeng/divider';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressBarModule } from 'primeng/progressbar';

import { OrderModule } from 'ngx-order-pipe';
import { EditableModule } from '@ngneat/edit-in-place';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MainAppComponent } from './main-app/main-app.component';
import { BillComponent } from './bill/bill.component';
import { NoBillComponent } from './no-bill/no-bill.component';
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    BillComponent,
    NoBillComponent,
    LoginComponent,
    ItemComponent,
    AddBillComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    ClipboardModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    DataViewModule,
    MultiSelectModule,
    InputSwitchModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ChipsModule,
    MenuModule,
    SidebarModule,
    SplitButtonModule,
    DividerModule,
    ConfirmPopupModule,
    ProgressBarModule,
    OrderModule,
    EditableModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
