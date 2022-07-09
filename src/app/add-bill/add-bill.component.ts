import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewBill } from '../model/bill.model';

@Component({
  selector: 'balc-add-bill',
  templateUrl: './add-bill.component.html',
})
export class AddBillComponent {
//   displayFriendsDialog = false;

  // TODO typing
  form: any = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    friends: [[], [Validators.required]],
    editors: [[]],
  });

  @Output() addBill = new EventEmitter<NewBill>();

  constructor(private fb: FormBuilder) {}

  onAddBill() {
    this.form.get('name')?.getError('maxLength');
    this.addBill.emit(this.form.value);
    this.form.reset({ name: '', friends: [], editors: [] });
  }
}
