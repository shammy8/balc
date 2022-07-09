import { Component, Input, OnInit } from '@angular/core';
import { createObjectWithEveryone } from 'src/utility-functions';
import { BillWithItems, ItemWithId } from '../model/bill.model';

@Component({
  selector: 'balc-total-spendings',
  template: `
    <div *ngFor="let friend of totalSpendings | keyvalue">
      {{ friend.key | titlecase }} spent £{{ friend.value | number: '1.2-2' }}
    </div>
    <br />
    Grand total: <b>£{{ grandTotal | number: '1.2-2' }}</b>
  `,
  styles: [],
})
export class TotalSpendingsComponent implements OnInit {
  totalSpendings: { [key: string]: number } = {};
  grandTotal = 0;

  @Input() billWithItems!: BillWithItems;

  constructor() {}

  ngOnInit(): void {
    ({
      totalSpendingsObject: this.totalSpendings,
      grandTotal: this.grandTotal,
    } = this.calculateTotalSpendings(this.billWithItems.items));
  }

  calculateTotalSpendings(items: ItemWithId[]) {
    const totalSpendingsObject = createObjectWithEveryone<number>(
      0,
      this.billWithItems.friends
    );
    let grandTotal = 0;

    for (const item of items) {
      for (const sharedBy of item.sharedBy) {
        totalSpendingsObject[sharedBy.friend] +=
          item.cost / Object.keys(item.sharedBy).length;
      }
      grandTotal += item.cost;
    }
    return { totalSpendingsObject, grandTotal };
  }
}
