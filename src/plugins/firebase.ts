import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDbHjaa7ulx-8aSfJt74dclKhQ6cl9B5Jg",
    authDomain: "vspo-schedule.firebaseapp.com",
    projectId: "vspo-schedule",
    storageBucket: "vspo-schedule.appspot.com",
    messagingSenderId: "1046860418750",
    appId: "1:1046860418750:web:28defa4947e238c9db98ef",
    measurementId: "G-1JNYGX3ZXN"
};
firebase.initializeApp(firebaseConfig)
firebase.analytics();
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp()

export default firebase