import app from '@firebase/app';
import '@firebase/auth';
import { config } from '../config';

app.initializeApp(config.firebase);
// const db = app.database().ref();
const auth = app.auth();

export const getCurrentUser = () =>
  new Promise(resolve => auth.onAuthStateChanged(resolve));

export const signUpEmail = ({ email, password }) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInEmail = async ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

export const signInWithGoogle = async () =>
  auth.signInWithPopup(new app.auth.GoogleAuthProvider());

export const resetPassword = email => auth.sendPasswordResetEmail(email);

export const updatePassword = password =>
  auth.currentUser.updatePassword(password);

export const signOut = () => auth.signOut();
