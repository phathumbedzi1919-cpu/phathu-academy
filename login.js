
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    const loginButton = document.querySelector(
        '#loginForm button[type="submit"]'
    );

    message.textContent = "";

    try {
        loginButton.disabled = true;
        loginButton.textContent = "Signing in...";

        // Wait for Firebase initialization and persistence.
        await window.academy.ready;

        const auth = window.academy.auth;
        const db = window.academy.db;

        // Authenticate account.
        const userCredential =
            await auth.signInWithEmailAndPassword(email, password);

        const user = userCredential.user;

        // Read the existing user profile.
        const doc = await db
            .collection("users")
            .doc(user.uid)
            .get();

        if (!doc.exists) {
            message.textContent =
                "Your account profile was not found. Please contact the administrator.";

            await auth.signOut();
            return;
        }

        const account = doc.data();

        // Administrator login.
        if (account.role === "admin") {
            window.location.href = "admin.html";
            return;
        }

        // Student login.
        if (account.role === "student") {

            if (account.status !== "approved") {
                message.textContent =
                    "Your account is awaiting administrator approval.";

                await auth.signOut();
                return;
            }

            window.location.href = "dashboard.html";
            return;
        }

        message.textContent = "Unknown account role.";
        await auth.signOut();

    } catch (error) {

        console.error("Login error:", error);

        if (error.code === "permission-denied" ||
            error.code === "firestore/permission-denied") {
            message.textContent =
                "Firestore permission denied. Check your database rules and user profile.";
        } else {
            message.textContent = error.message;
        }

    } finally {

        if (loginButton) {
            loginButton.disabled = false;
            loginButton.textContent = "Login";
        }
    }
});
        
