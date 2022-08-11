import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as path from "path";
import * as os from "os";
import * as fs from "fs";

// TODO only need this for one function
// import {Client} from "@veryfi/veryfi-sdk"; // These doesn't work
// import * as Veryfi from "@veryfi/veryfi-sdk";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Client = require("@veryfi/veryfi-sdk");

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
      // TODO put these somewhere safe
      // ie https://firebase.google.com/docs/functions/config-env?hl=en&authuser=0#secret-manager
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

      // TODO handle errors

      const tempFilePath = path.join(
          os.tmpdir(),
          `${data.fileName}.${data.fileExtension}`
      );

      const file = storage.bucket().file(`veryfi-receipts/${data.fileName}`);

      await file.download({destination: tempFilePath});

      const veryfiClient = new Client(
          clientId, clientSecret, username, apiKey
      );
      const veryfiDocument = await veryfiClient.process_document(
          tempFilePath, ["Grocery"], true // TODO customise options in here
      );

      fs.unlinkSync(tempFilePath); // delete temp file
      await file.delete(); // delete from Firebase storage
      // TODO do we need to await delete

      // map veryfiDocument to properties we need before sending to front end
      return veryfiDocument;
    }
);

//   functions.logger.log("data.fileName", data.fileName);
