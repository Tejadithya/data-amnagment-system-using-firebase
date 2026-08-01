const SESSION_KEY = "dms_current_user";

function getCurrentUser() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
    sessionStorage.removeItem(SESSION_KEY);
}

function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    return user;
}

function redirectIfAuthenticated() {
    if (getCurrentUser()) {
        window.location.href = "home.html";
    }
}

function showMessage(elementId, message, type = "error") {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = `message ${type}`;
    el.hidden = false;
}

function hideMessage(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.hidden = true;
}

// Signup
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
    redirectIfAuthenticated();

    signupBtn.addEventListener("click", () => {
        hideMessage("signup-message");

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const phone = document.getElementById("signup-phone").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        if (!name || !email || !phone || !password || !confirmPassword) {
            showMessage("signup-message", "Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            showMessage("signup-message", "Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("signup-message", "Passwords do not match.");
            return;
        }

        const userRef = database.ref("users/" + name);
        userRef.once("value").then((snapshot) => {
            if (snapshot.exists()) {
                showMessage("signup-message", "Username already exists. Choose another name.");
                return;
            }

            return userRef.set({
                name,
                email,
                phone,
                password,
                createdAt: new Date().toISOString()
            });
        }).then((result) => {
            if (result === undefined) return;
            showMessage("signup-message", "Account created! Redirecting to login...", "success");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);
        }).catch((error) => {
            showMessage("signup-message", "Error: " + error.message);
        });
    });
}

// Login
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    redirectIfAuthenticated();

    loginBtn.addEventListener("click", () => {
        hideMessage("login-message");

        const name = document.getElementById("login-name").value.trim();
        const password = document.getElementById("login-password").value;

        if (!name || !password) {
            showMessage("login-message", "Please enter your username and password.");
            return;
        }

        const userRef = database.ref("users/" + name);
        userRef.get().then((snapshot) => {
            if (!snapshot.exists()) {
                showMessage("login-message", "User does not exist.");
                return;
            }

            const userData = snapshot.val();
            if (userData.password !== password) {
                showMessage("login-message", "Incorrect password.");
                return;
            }

            setCurrentUser({ name: userData.name, email: userData.email });
            window.location.href = "home.html";
        }).catch((error) => {
            showMessage("login-message", "Error: " + error.message);
        });
    });
}
