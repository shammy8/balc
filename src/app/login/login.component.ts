import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleAuthProvider } from 'firebase/auth';
import { Auth, signInAnonymously, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'balc-login',
  template: `<div>
    <button
      pButton
      icon="pi pi-google"
      label="Sign in with Google"
      (click)="loginWithGoogle()"
    ></button>
    <button
      pButton
      label="Sign in anonymously"
      (click)="loginAnonymously()"
    ></button>
  </div>`,
  styles: [
    `
      :host {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--surface-0);
      }
      button {
        display: block;
        width: 200px;
        margin-bottom: 50px;
      }
    `,
  ],
})
export class LoginComponent {
  constructor(private _auth: Auth, private router: Router) {}

  loginWithGoogle() {
    signInWithPopup(this._auth, new GoogleAuthProvider())
      .then(() => this.router.navigate(['']))
      .catch(); // TODO
  }

  loginAnonymously() {
    signInAnonymously(this._auth)
      .then(() => this.router.navigate(['']))
      .catch(); // TODO
  }
}
