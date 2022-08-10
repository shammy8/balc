import { Component, OnInit } from '@angular/core';

import { Functions, httpsCallable } from '@angular/fire/functions';

import { nanoid } from 'nanoid';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'balc-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  constructor(private storage: Storage, private functions: Functions) {}

  ngOnInit(): void {
    console.log('upload image component');
  }

  async onSelect({ currentFiles }: { currentFiles: File[] }) {
    const fileId = nanoid();
    const url = `veryfi-receipts/${fileId}`;

    const storageRef = ref(this.storage, url);
    const result = await uploadBytes(storageRef, currentFiles[0]);

    const downloadURL = await getDownloadURL(ref(this.storage, url));
    console.log(downloadURL);
    const processReceiptFn = httpsCallable(this.functions, 'processReceipt');
    const veryfiDocument = await processReceiptFn({
      fileName: fileId,
    });
  }

  async getDownloadUrl() {
    // getDownloadURL(ref(this.storage, 'photo')).then((url) => {
    //   console.log(url);
    // });
    console.log('call function');
    const fn = httpsCallable(this.functions, 'test');
    const veryfiDocument = await fn({ data: 'FromBalc' });
    console.log(veryfiDocument);
  }
}
