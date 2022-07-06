import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

import { BillComponent } from './bill/bill.component';
import { LoginComponent } from './login/login.component';
import { MainAppComponent } from './main-app/main-app.component';
import { NoBillComponent } from './no-bill/no-bill.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo(['']),
    },
  },
  {
    path: '',
    component: MainAppComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
    children: [
      { path: '', component: NoBillComponent },
      { path: ':billId', component: BillComponent },
    ],
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
