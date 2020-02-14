
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyDFb7kYnhHDn1BGHfzL9BuEx6h9Ya05_jQ",
    authDomain: "flutter-master-admin.firebaseapp.com",
    databaseURL: "https://flutter-master-admin.firebaseio.com",
    projectId: "flutter-master-admin",
    storageBucket: "flutter-master-admin.appspot.com",
    messagingSenderId: "456356215380",
    appId: "1:456356215380:web:44821a1555247cf7074bc1",
    measurementId: "G-47KPQ20RVR"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;