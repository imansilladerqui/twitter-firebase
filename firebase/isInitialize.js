import * as firebase from "firebase";

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

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
