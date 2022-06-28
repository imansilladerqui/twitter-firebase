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

const config = {
  apiKey: "AIzaSyBOyj8ld1sLhEEk0i2kCZ8Wg5gigip27Qo",
  authDomain: "twitts-69317.firebaseapp.com",
  databaseURL:
    "https://twitts-69317-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "twitts-69317",
  storageBucket: "twitts-69317.appspot.com",
  messagingSenderId: "86737244928",
  appId: "1:86737244928:web:005f1f0ddb042487bc19e5",
};

!admin.apps.length && admin.initializeApp(config);

export const firestore = admin.firestore();
