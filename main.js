// Firebase configuration
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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Signup Functionality
document.getElementById('signup-btn').addEventListener('click', () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (name && email && phone && password && confirmPassword) {
        if (password === confirmPassword) {
            const usersRef = database.ref('users');
            usersRef.child(name).set({
                name,
                email,
                phone,
                password
            }).then(() => {
                alert('User registered successfully!');
                window.location.href = 'login.html';
            }).catch(error => {
                alert('Error: ' + error.message);
            });
        } else {
            alert('Passwords do not match');
        }
    } else {
        alert('Please fill in all fields');
    }
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', () => {
    const name = document.getElementById('login-name').value;
    const password = document.getElementById('login-password').value;

    if (name && password) {
        const userRef = database.ref('users/' + name);
        userRef.get().then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.password === password) {
                    alert('Successfully logged in!');
                    window.location.href = 'home.html';
                } else {
                    alert('Incorrect password');
                }
            } else {
                alert('User does not exist');
            }
        }).catch(error => {
            alert('Error: ' + error.message);
        });
    } else {
        alert('Please enter your name and password');
    }
});
