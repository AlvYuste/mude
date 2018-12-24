import app from 'firebase/app';
import 'firebase/auth';
import { config } from '../config';

class Firebase {
  constructor() {
    app.initializeApp(config.firebase);
    this.auth = app.auth();
  }
  registerEmail = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInEmail = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () =>
    this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  signOut = () => this.auth.signOut();
}

export default Firebase;
