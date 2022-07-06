import { Injectable } from '@angular/core';

import { Auth, authState } from '@angular/fire/auth';
import {
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';

import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { auditTime, map, switchMap, take, tap } from 'rxjs/operators';

import {
  Bill,
  BillWithId,
  DeleteItem,
  Item,
  ItemWithId,
  NewBill,
} from './model/bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private billsRS = new ReplaySubject<BillWithId[]>(1);
  bills$ = this.billsRS.asObservable();

  constructor(private store: Firestore, private auth: Auth) {}

  fetchBills() {
    authState(this.auth)
      .pipe(
        switchMap((user) => {
          if (!user) return EMPTY;

          const queryFn = query(
            collection(this.store, 'bills'),
            where(`editors.${user.uid}`, '==', true)
          );
          return collectionData(queryFn, {
            idField: 'id',
          }) as Observable<BillWithId[]>;
        }),
        tap((bills) => console.log('READ Bills', bills))
      )
      .subscribe((bills) => this.billsRS.next(bills));
  }

  getSingleBill(billId: string) {
    return this.bills$.pipe(
      map((bills) => {
        return bills.find((bill) => bill.id === billId);
      })
    );
  }

  // TODO changing bills or loading first bill will still wait the 800ms in the auditTime below.
  fetchItemsForBill(billId: string): Observable<ItemWithId[]> {
    return collectionData(collection(this.store, `bills/${billId}/items`), {
      idField: 'id',
    }) as Observable<ItemWithId[]>;
    // .pipe(
    // auditTime(800),
    //   tap((items) => console.log('READ items', items))
    // );
  }

  addItem(newItem: Item, billId: string) {
    console.log('CREATE ITEM');
    addDoc(collection(this.store, `bills/${billId}/items`), {
      ...newItem,
      cost: +newItem.cost,
    });
  }

  itemChange(item: ItemWithId, billId: string) {
    console.log('UPDATE item');
    updateDoc(doc(this.store, `bills/${billId}/items/${item.id}`), {
      description: item.description,
      cost: item.cost,
      sharedBy: item.sharedBy,
    });
  }

  addBill(newBill: NewBill, userUid: string) {
    console.log('CREATE BILL');
    const editors: { [key: string]: boolean } = {};
    for (let editor in newBill.editors) {
      editors[newBill.editors[editor]] = true;
    }
    editors[userUid] = true;

    const billCollection = collection(this.store, 'bills');
    return addDoc(billCollection, {
      name: newBill.name,
      friends: newBill.friends,
      creator: userUid,
      editors,
    });
  }

  addEditors(
    newEditorsArray: string[],
    billId: string,
    editors: { [key: string]: boolean }
  ) {
    console.log('UPDATE editors in bill');
    for (const editor of newEditorsArray) {
      editors[editor] = true;
    }
    updateDoc(doc(this.store, `bills/${billId}`), { editors });
  }

  addFriends(friends: string[], billId: string) {
    console.log('UPDATE friends in bill');
    updateDoc(doc(this.store, `bills/${billId}`), {
      friends: arrayUnion(...friends),
    });
  }

  deleteItem({ billId, itemId }: DeleteItem) {
    deleteDoc(doc(this.store, `bills/${billId}/items/${itemId}`));
  }

  setAsPrimaryBill(billId: string) {
    authState(this.auth)
      .pipe(take(1))
      .subscribe((user) => {
        updateDoc(doc(this.store, `users/${user!.uid}`), {
          primaryBill: billId,
        });
      });
  }
}
