import app from '@firebase/app';
import '@firebase/auth';
import { config } from '../config';

app.initializeApp(config.firebase);
// export const db = app.database().ref();
export const auth = app.auth();
