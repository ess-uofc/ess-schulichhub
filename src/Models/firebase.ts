import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
// import 'firebase/messaging';
import 'firebase/storage';
import FireStoreDB from './firestore';
export const Timestamp = firebase.firestore.Timestamp;
export type Timestamp = firebase.firestore.Timestamp;
export type DocumentData = firebase.firestore.DocumentData;
export type WhereFilterOp = firebase.firestore.WhereFilterOp;
export type FirebaseUser = firebase.User;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type SnapshotOptions = firebase.firestore.SnapshotOptions;
export type FirestoreDataConverter<T> = firebase.firestore.FirestoreDataConverter<T>;
export type SetOptions = firebase.firestore.SetOptions;
export type DocumentReference = firebase.firestore.DocumentReference;
export const GoogleProvider = firebase.auth.GoogleAuthProvider;
export type FirebaseAuthError = firebase.auth.Error;
export type FirebaseUnsubscribe = firebase.Unsubscribe;
export const OAuthProvider = firebase.auth.OAuthProvider;
export type OAuthProvider = firebase.auth.AuthProvider;
export const FieldValue = firebase.firestore.FieldValue;

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
export const analytics = app.analytics(); //UserEvent analytics such as login/creation page view etc...
// export const messaging = app.messaging(); //Push notifications and in app messaging
export const FirebaseAuth = app.auth();
export const Storage = app.storage();
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase.firestore().enablePersistence({ synchronizeTabs: true });
export const Firestore = app.firestore();

export const db = new FireStoreDB();
