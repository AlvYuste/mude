import firebase from '@firebase/app';
import '@firebase/auth';
import { config } from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}
const auth = firebase.auth();

export const getCurrentUser = () =>
  new Promise(resolve => auth.onAuthStateChanged(resolve));

export const signUpEmail = ({ email, password }) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInEmail = async ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

export const signInWithGoogle = async () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const resetPassword = email => auth.sendPasswordResetEmail(email);

export const updatePassword = password =>
  auth.currentUser.updatePassword(password);

export const signOut = () => auth.signOut();
