/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// TODO only need this for one function
// import {Client} from "@veryfi/veryfi-sdk"; // TODO try this instead
// import * as Veryfi from "@veryfi/veryfi-sdk";
const Client = require("@veryfi/veryfi-sdk");
const path = require("path");
const os = require("os");


admin.initializeApp();
const store = admin.firestore();
const storage = admin.storage();

export const userRegister = functions.auth.user().onCreate((user, context) => {
  const userRef = store.doc(`users/${user.uid}`);
  return userRef.set({
    createdAt: context.timestamp,
  });
});

export const processReceipt = functions.https.onCall(
    async (data) => {
      // TODO put these somewhere safe, ie https://firebase.google.com/docs/functions/config-env?hl=en&authuser=0#secret-manager
      const clientId = process.env.VERYFI_CLIENT_ID;
      const clientSecret = process.env.VERYFI_CLIENT_SECRET;
      const username= process.env.VERYFI_USERNAME;
      const apiKey = process.env.VERYFI_API_KEY;

      if (clientId == undefined ||
        clientSecret == undefined ||
        username == undefined ||
        apiKey == undefined
      ) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "Missing Veryfi keys."
        );
      }

      // TODO get file type here and append to bottom
      const tempFilePath = path.join(os.tmpdir(), `${data.fileName}.jpg`);
      await storage.bucket().file(`veryfi-receipts/${data.fileName}`)
          .download({destination: tempFilePath});

      // TODO delete receipts from storage and temp file

      const client = new Client(
          clientId, clientSecret, username, apiKey
      );
      return client.process_document(
          tempFilePath, ["Grocery"], true
      );
    }
);

//   functions.logger.log("data.fileName", data.fileName);
