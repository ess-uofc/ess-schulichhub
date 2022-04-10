import { initializeApp } from 'firebase/app';
import { CACHE_SIZE_UNLIMITED, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/storage';
import FireStoreDB from './firestore';

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
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); //UserEvent analytics such as login/creation page view etc...
export const FirebaseAuth = getAuth(app);
export const Storage = getStorage(app);

export const Firestore = initializeFirestore(app, { cacheSizeBytes: CACHE_SIZE_UNLIMITED });

export const db = new FireStoreDB();
