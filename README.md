# Data Management System using Firebase

A web-based data management application with user authentication and CRUD operations, powered by **Firebase Realtime Database**.

## Features

- User registration and login
- Session-based access to the dashboard
- Create, read, update, and delete personal records
- Real-time data sync with Firebase
- Responsive UI

## Screenshots

**Sign In:**
![Signin page](https://github.com/user-attachments/assets/c8cb5e01-247f-4491-b709-46a23ecad284)

**Sign Up:**
![Signup page](https://github.com/user-attachments/assets/1c1714ff-70bc-4dbe-88af-8cc4f41501f6)

## Project Structure

```
data-managment-system-using-firebase/
├── index.html              # Landing page
├── login.html              # Login page
├── signup.html             # Registration page
├── home.html               # Dashboard with CRUD
├── styles.css              # Shared styles
├── js/
│   ├── firebase-config.js  # Firebase initialization
│   ├── auth.js             # Login, signup, session handling
│   └── dashboard.js        # Record management (CRUD)
├── firebase-database-rules.json  # Example Firebase rules
└── README.md
```

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Realtime Database**
3. Copy your config into `js/firebase-config.js`
4. Set database rules (for development, see `firebase-database-rules.json`)

> **Note:** For production, use Firebase Authentication instead of storing passwords in the database, and restrict database rules per user.

## Run Locally

Firebase requires a web server (not `file://`). Use any of these:

**Python:**
```bash
python -m http.server 5500
```

**Node.js (npx):**
```bash
npx serve .
```

Then open: [http://localhost:5500](http://localhost:5500)

## Usage

1. Open the app in your browser
2. **Sign Up** with username, email, phone, and password
3. **Login** with your username and password
4. On the dashboard, add records with title, category, and description
5. **Edit** or **Delete** records from the table
6. **Logout** when done

## Data Structure

```
users/
  {username}/
    name, email, phone, password, createdAt
    records/
      {recordId}/
        title, category, description, createdAt, updatedAt
```

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla)
- Firebase Realtime Database (compat SDK v9)
- Session storage for client-side auth state

## License

MIT
