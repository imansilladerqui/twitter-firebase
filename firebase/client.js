import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLSL3Dyb8hPdePs8nNhUITgCwj_-ok9U4",
  authDomain: "devter-9b9ed.firebaseapp.com",
  projectId: "devter-9b9ed",
  storageBucket: "devter-9b9ed.appspot.com",
  messagingSenderId: "490097028156",
  appId: "1:490097028156:web:cb06be3f829ac4e2a82739",
  measurementId: "G-JF4NBKDSKL",
};

const mapUserFromFirebaseAuth = (user) => {
  if (user) {
    const { displayName, email, photoURL } = user;
    return {
      avatar: photoURL,
      username: displayName,
      email,
    };
  } else {
    return user;
  }
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = (setUser) => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(gitHubProvider)
    .then(onAuthStateChanged(setUser));
};
