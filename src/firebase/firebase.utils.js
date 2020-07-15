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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
      console.log('First Time User LoggedIn saving the data to DB');
      
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error) {
        console.log('Error Creating the user', error);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;