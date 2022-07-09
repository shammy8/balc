import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Item } from '../model/bill.model';

@Component({
  selector: 'balc-add-item',
  templateUrl: './add-item.component.html',
  styles: [],
})
export class AddItemComponent {
  @Input() users!: string[];
  @Output() addItem = new EventEmitter<Item>();

  // TODO typing
  form: any = this.fb.group({
    description: ['', [Validators.required, Validators.maxLength(25)]],
    cost: [
      0.0,
      [
        Validators.required,
        Validators.max(1000000),
        Validators.min(0.01),
        Validators.pattern('^[0-9]*(.[0-9]{0,2})?$'),
      ],
    ],
    paidBy: ['', [Validators.required]],
    sharedBy: [[], [Validators.required]],
    date: [new Date(), [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  calculateCost(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // TODO add validation to only eval when all digits are numbers, +,-,*,/,( or )
    if (value[0] !== '=') return;
    const calculatedCost = eval(value.substring(1));
    if (value[0] !== '=') return;
    if (typeof calculatedCost === 'number') {
      this.form.get('cost')?.patchValue(calculatedCost);
    } else {
      this.form.get('cost')?.patchValue(0.0);
    }
  }

  onAddItem() {
    const sharedByInCorrectFormat = this.form
      .get('sharedBy')
      ?.value.map((friend: string) => {
        return {
          friend,
          settled: this.form.get('paidBy')?.value === friend,
        };
      });
    this.addItem.emit({
      ...this.form.value,
      sharedBy: sharedByInCorrectFormat,
    });
    this.form.reset({ cost: 0.0, date: new Date() });
  }
}
