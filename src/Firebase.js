import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyBg19jzJVqt4WBI3_aZRnR39HzrREi9tZo",
    authDomain: "portfolio-react-music.firebaseapp.com",
    projectId: "portfolio-react-music",
    storageBucket: "portfolio-react-music.appspot.com",
    messagingSenderId: "894678094695",
    appId: "1:894678094695:web:9a645ee036818aa3c055c2",
    measurementId: "G-82MKME9LT5"
};

export default firebase.initializeApp(firebaseConfig);