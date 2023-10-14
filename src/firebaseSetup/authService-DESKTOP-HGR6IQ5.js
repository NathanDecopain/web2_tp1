// Firebase Auth config
import {browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();

setPersistence(authService, browserLocalPersistence).then(() => {}) // Session stays in LocalStorage until user logs out

export function mySignUpWithEmailAndPassword(email, password, password_confirmation) {
    // TODO: email and password sign-up
    try {
        if (!(password === password_confirmation)) {
            return false; // TODO: Error handling
        }

        createUserWithEmailAndPassword(authService, email, password)
            .then(response => {
                return true;
            })
            .catch((e) => {
                // Handle firebase errors here
                switch (e.code) {
                    case "auth/email-already-in-use":
                        return false; // TODO: Error handling,
                    case "auth/invalid-email":
                        return false; // TODO: Error handling,
                    case "auth/operation-not-allowed":
                        return false; // TODO: Error handling,
                    case "auth/weak-password":
                        return false; // TODO: Error handling,
                }
            })
    } catch (e) {

    }
}

function mySignInWithEmailAndPassword() {
    // TODO: email and password sign-in
}

function myGoogleSignIn() {
    // TODO: google sign-in
}

module.export = {
    auth: auth,
    mySignUpWithEmailAndPassword,
    mySignInWithEmailAndPassword,
    myGoogleSignIn
}
