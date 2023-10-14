// Firebase Auth config
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword
} from "firebase/auth";
import {firebaseApp} from "./firebaseConfig";
export const auth = getAuth(firebaseApp);

setPersistence(auth, browserLocalPersistence).then(() => {}) // Session stays in LocalStorage until user logs out

export function mySignUpWithEmailAndPassword(displayName, email, password, passwordConfirmation) {
    if (password !== passwordConfirmation) {
        throw new Error("Passwords do not match")
    }
    return createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            if (!result.user) {
                return false;
            }
            // TODO: Query database to check if username is taken
            result.user.updateProfile({
                displayName: displayName,
            }).then(() => {
                return true;
            })
        .catch((e) => {
            throw e
        })
    })
}

export function mySignInWithEmailAndPassword() {
    // TODO: email and password sign-in!
}

export function myGoogleSignIn() {
    // TODO: google sign-in
}
