import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'balc-add-editors',
  templateUrl: './add-editors.component.html',
  styles: [],
})
export class AddEditorsComponent {
  // TODO typings
  form: any = this.fb.group({
    editorsArray: [[]],
  });

  @Output() addEditors = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  onAddEditors() {
    this.addEditors.emit(this.form.get('editorsArray')?.value);
    this.form.reset({ editorsArray: [] });
  }
}
