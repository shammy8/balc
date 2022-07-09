import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const store = admin.firestore();

export const userRegister = functions.auth.user().onCreate((user, context) => {
  const userRef = store.doc(`users/${user.uid}`);
  return userRef.set({
    createdAt: context.timestamp,
  });
});
