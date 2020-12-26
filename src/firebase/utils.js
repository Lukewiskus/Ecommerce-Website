import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

//initlize firebase here :)
firebase.initializeApp(firebaseConfig);

//create functions that can call these functions so we only have to initlize firebase here
export const auth = firebase.auth();
export const firestore = firebase.firestore();


//signInWithGoogle needs a provider, which is the next line, you can recreate the next to line with different
//providers if you so choose
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });


export const handleUserProfile = async (userAuth, additionalData) => {
    //if user is null, return
    if(!userAuth) return;
    //check to see if user is a valid user

    //uid is the id of the user in firebase
    const { uid } = userAuth;
    //path to document that holds the user in firebase data
    //if user exists in our database, its return this line below
    const userRef= firestore.doc(`users/${uid}`)

    //snapShot of the users info
    const snapShot = await userRef.get();

    //snapShot.exists returns a boolean, which means if the `users/${uid}` address exisits or not
    //this is looks at if snap shot does not exist, do whats in the if statement
    if(!snapShot.exists) {
        const { displayName, email} = userAuth;
        const timestamp = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch(err){
            // console.log(eer)
        }
    }
    return userRef;
};