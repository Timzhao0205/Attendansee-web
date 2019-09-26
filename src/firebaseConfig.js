import firebase from 'firebase';
import ("firebase/firestore");
import ("firebase/database");

var firebaseConfig = {
    apiKey: "AIzaSyDOV8sfmtUVPRkKQx-DT1IBOutJeg7lT70",
    authDomain: "attendance-app-0205.firebaseapp.com",
    databaseURL: "https://attendance-app-0205.firebaseio.com",
    projectId: "attendance-app-0205",
    storageBucket: "attendance-app-0205.appspot.com",
    messagingSenderId: "249323237418",
    appId: "1:249323237418:web:9d4888b1d77d24cb"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const fsdb = app.firestore();
const rtdb = app.database();

export {
    fsdb,
    rtdb
}
