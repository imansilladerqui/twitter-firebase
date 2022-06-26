import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBOyj8ld1sLhEEk0i2kCZ8Wg5gigip27Qo",
  authDomain: "twitts-69317.firebaseapp.com",
  projectId: "twitts-69317",
  storageBucket: "twitts-69317.appspot.com",
  messagingSenderId: "86737244928",
  appId: "1:86737244928:web:005f1f0ddb042487bc19e5",
};

!firebase.apps.length && firebase.initializeApp(config);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChangedAPI = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;

    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        const date = new Date(createdAt.seconds * 1000);
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
          date
        );

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        };
      });
    });
};
