import { auth } from './api';

export const getCurrentUser = () =>
  new Promise(resolve => auth.onAuthStateChanged(resolve));

export const signUpEmail = ({ email, password }) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInEmail = async ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

export const signInWithGoogle = async () =>
  auth.signInWithPopup(new auth.GoogleAuthProvider());

export const resetPassword = email => auth.sendPasswordResetEmail(email);

export const updatePassword = password =>
  auth.currentUser.updatePassword(password);

export const signOut = () => auth.signOut();
