const admin = require("firebase-admin");

const serviceAccount = require("./firebase-keys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://twitts-69317-default-rtdb.europe-west1.firebasedatabase.app",
  });
} catch (e) {}

export const firestore = admin.firestore();
