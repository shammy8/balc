import { Injectable } from '@angular/core';

import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc , docData } from '@angular/fire/firestore';

import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserDoc } from './model/bill.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDoc$ = authState(this._auth).pipe(
    switchMap((user) => {
      if (!user) return EMPTY;
      return docData(doc(this._store, `users/${user.uid}`)) as Observable<UserDoc>;
    }),
    tap((userDoc) => console.log('userDoc$', userDoc))
  );

  constructor(private _auth: Auth, private _store: Firestore) {}
}
