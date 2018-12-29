import firebase from '@firebase/app';
import { config } from '../config';
import '@firebase/database';
import { getCurrentUser } from './auth';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}
const db = firebase.database();

export const saveProject = async (project = {}) => {
  const account = await getCurrentUser();
  if (!account) {
    throw new Error('You must sign in to save your project');
  }
  if (project.id) {
    db.ref(`projects/${project.id}`).update(project);
    return project;
  }
  const newProjectRef = db.ref('projects').push({
    ...project,
    owner: account.uid,
  });
  await newProjectRef.update({ id: newProjectRef.key });
  return { ...project, owner: account.uid, id: newProjectRef.key };
};
