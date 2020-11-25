import firebase from 'firebase';

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

export default app;
