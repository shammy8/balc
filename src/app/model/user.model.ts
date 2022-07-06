import { Timestamp } from '@angular/fire/firestore';

export interface UserDoc {
  createdAt: Timestamp;
  primaryBill?: string;
}
