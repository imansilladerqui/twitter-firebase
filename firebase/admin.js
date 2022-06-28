const admin = require("firebase-admin");

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} catch (e) {}

export const firestore = admin.firestore();
