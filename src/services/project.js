import firebase from '@firebase/app';
import { config } from '../config';
import '@firebase/database';
import { getCurrentUser } from './auth';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}
const db = firebase.database();

const ownProjectsRef = account =>
  db
    .ref('projects')
    .orderByChild('owner')
    .equalTo(account.uid);
const projectByIdRef = id => db.ref(`projects/${id}`);

export const getOwnProjects = async (updateCallback = () => {}) => {
  const account = await getCurrentUser();
  if (!account) {
    throw new Error('You must sign in to get your projects');
  }
  ownProjectsRef(account).on('value', snapshot =>
    updateCallback(Object.values(snapshot.val())),
  );
  return Object.values((await ownProjectsRef(account).once('value')).val());
};

export const getProjectDetail = async (id, updateCallback = () => {}) => {
  const projectRef = projectByIdRef(id);
  projectRef.on('value', snapshot => updateCallback(snapshot.val()));
  return (await projectRef.once('value')).val();
};

export const saveProject = async (project = {}) => {
  const account = await getCurrentUser();
  const projectWithOwner = {
    ...project,
    owner: account.uid,
  };
  if (!account) {
    throw new Error('You must sign in to save your project');
  }
  if (project.id) {
    db.ref(`projects/${project.id}`).update(projectWithOwner);
    return project;
  }
  const newProjectRef = db.ref('projects').push(projectWithOwner);
  await newProjectRef.update({ id: newProjectRef.key });
  return { ...project, owner: account.uid, id: newProjectRef.key };
};
