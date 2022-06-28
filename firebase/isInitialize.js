import * as firebase from "firebase";

const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
