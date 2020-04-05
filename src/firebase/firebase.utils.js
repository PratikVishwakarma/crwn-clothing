
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



export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = userRef.get();
    if (!snapShot.exist) {
        const displayName = userAuth.displayName
        const email = userAuth.email
        const uid = userAuth.uid
        // const { displayName, email, uid } = userAuth;
        const createdAt = new Date().setMilliseconds(0);
        try {
            await userRef.set({
                displayName, email, id: uid, createdAt, ...additionalData
            })
        } catch (error) {
            console.log(`error creating user `, error.message);
        }
    }
    return userRef;
}

export const addCollectionAndItems = async (collectionName, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionName);

    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj);
    })

    return await batch.commit()
}

export const convertColletionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

