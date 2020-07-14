import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDo60-yCGYbeucnkCclsmr2XzUMA3mlebI",
    authDomain: "crowndb-1e068.firebaseapp.com",
    databaseURL: "https://crowndb-1e068.firebaseio.com",
    projectId: "crowndb-1e068",
    storageBucket: "crowndb-1e068.appspot.com",
    messagingSenderId: "447010646435",
    appId: "1:447010646435:web:85a9719f33e51e75781216",
    measurementId: "G-W455FB32CC"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;