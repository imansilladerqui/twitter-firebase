const admin = require("firebase-admin");

const serviceAccount = process.env.FIREBASE_KEYS;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} catch (e) {}

export const firestore = admin.firestore();
