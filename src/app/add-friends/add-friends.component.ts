import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'balc-add-friends',
  templateUrl: './add-friends.component.html',
  styles: [],
})
export class AddFriendsComponent {
  // TODO typings
  form: any = this.fb.group({
    friends: [[]],
  });

  @Output() addFriends = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  onAddFriends() {
    this.addFriends.emit(this.form.get('friends')?.value);
    this.form.reset({ friends: [] });
  }
}
