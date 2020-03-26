import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCj2XXLMxa8LvRU0vCihUYZWVFTC8rm-_s",
    authDomain: "rcsg-117e5.firebaseapp.com",
    databaseURL: "https://rcsg-117e5.firebaseio.com",
    projectId: "rcsg-117e5",
    storageBucket: "rcsg-117e5.appspot.com",
    messagingSenderId: "998416144629",
    appId: "1:998416144629:web:f6cfe1030cc734de"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
