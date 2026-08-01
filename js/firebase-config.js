// Firebase configuration - replace with your own project credentials if needed
const firebaseConfig = {
    apiKey: "AIzaSyBJupEFKdEUjz9QvYLQMy7WFMsWHrgrOIU",
    authDomain: "bank-managment-b7812.firebaseapp.com",
    projectId: "bank-managment-b7812",
    storageBucket: "bank-managment-b7812.appspot.com",
    databaseURL: "https://bank-managment-b7812-default-rtdb.firebaseio.com",
    messagingSenderId: "563847294648",
    appId: "1:563847294648:web:d1472569714fdab8c48e4d",
    measurementId: "G-EENPPV0KTW"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
