const admin = require("firebase-admin");

console.log(process.env.FIREBASE_CLIENT_EMAIL);
console.log(process.env.FIREBASE_PRIVATE_KEY);
console.log(process.env.FIREBASE_DATABASE_URL);

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: "twitts-69317",
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} catch (e) {}

const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

!admin.apps.length && admin.initializeApp(config);

export const firestore = admin.firestore();
