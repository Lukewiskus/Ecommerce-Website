import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from './user.actions';
import { auth, getCurrentUser, handleUserProfile, GoogleProvider } from './../../firebase/utils';
import { handleResetPasswordAPI } from './user.helpers'
export function* getSnapshotFromUserAuth(user, additionalData = {} ) {
    //this function takes this user and uses the handleUserProfile to then sign that user in
    try{
        const userRef = yield call(handleUserProfile, { userAuth: user });
        //userRef now has methods that can be used from firebase API
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch(err) {
        //console.log
    }
}

export function* emailSignIn( { payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
        // dispatch({
        //     type: userTypes.SIGN_IN_SUCCESS,
        //     payload: true
        // });
    }
    catch(err){
        //console.log
    }
}

export function* onEmailSignInStart() {
    //yield means to pause and reume a generator function until a value is returned
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        //if they are logged in, then we want to restore our redux store
        // with the current user information so the webpage can reflect that
        yield getSnapshotFromUserAuth(userAuth);

    } catch(err) {
        //console.log(err)
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess())
    } catch(err){
        console.log(err);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser( { payload: {
    displayName,
    email,
    password,
    confirmPassword
    }}) {
    if (password !== confirmPassword) {
        const err = ['PASSWORDS DO NOT MATCH'];
        yield put(userError(err))
        return;
    }
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email,password);
        const additionalData = { displayName };
        yield getSnapshotFromUserAuth(user, additionalData)

    }
    catch(err) {
        //console.log(err);
    }
}  

export function* onSignUpUserStart() {
     yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
 }

export function* resetPassword( { payload: { email }}) {
    //integrate with firebase on a submit to send an email to the email entered to attempt to change the password
    
    try {
        //yield allows us to await for our resolve/reject from the promise
        yield call(handleResetPasswordAPI, email);
        yield put(resetPasswordSuccess());
    }
    catch(err){
        yield put(userError(err));
    }
}
export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
    try{
        const { user } = yield auth.signInWithPopup(GoogleProvider)
        yield getSnapshotFromUserAuth(user);
    }
    catch(e){
        //console.log
    }
};

export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
    //yield makes it wait for all to return, all calls every function called in the array
    //that it is passed, call calls it indivdually,  and itll export default userSagas
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart)
    ])
}