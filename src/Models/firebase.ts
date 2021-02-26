import firebase from 'firebase';
import { type } from 'os';

export const Timestamp = firebase.firestore.Timestamp;
export type Timestamp = firebase.firestore.Timestamp;

export type DocumentData = firebase.firestore.DocumentData;
export type WhereFilterOp = firebase.firestore.WhereFilterOp;
export type FirebaseUser = firebase.User;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
const firebaseConfig = {
    apiKey: 'AIzaSyD9mulwyPhAR7tUp0MdZ31_RodyAhIMdpk',
    authDomain: 'project-hub-116d7.firebaseapp.com',
    databaseURL: 'https://project-hub-116d7.firebaseio.com',
    projectId: 'project-hub-116d7',
    storageBucket: 'project-hub-116d7.appspot.com',
    messagingSenderId: '60966505195',
    appId: '1:60966505195:web:c1cd5d9a1b2e1befa8ccae',
    measurementId: 'G-K08FLKLRRG',
};
const app: firebase.app.App = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase.firestore().enablePersistence({ synchronizeTabs: true });

export const Auth = app.auth();
export const Firestore = app.firestore();
export default app;
