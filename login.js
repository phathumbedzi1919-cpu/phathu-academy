
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    const auth = window.academy.auth;
    const db = window.academy.db;

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");
        const loginButton = loginForm.querySelector(
            'button[type="submit"]'
        );

        message.textContent = "";

        try {

            loginButton.disabled = true;
            loginButton.textContent = "Signing in...";

            await window.academy.ready;

            // Authenticate user.
            const credential =
                await auth.signInWithEmailAndPassword(email, password);

            const user = credential.user;

            // Retrieve the matching Firestore profile.
            const profile = await db
                .collection("users")
                .doc(user.uid)
                .get();

            if (!profile.exists) {

                await auth.signOut();

                message.textContent =
                    "Your profile could not be found. Please contact the administrator.";

                return;
            }

            const account = profile.data();

            // Administrator access.
            if (account.role === "admin") {

                window.location.href = "admin.html";
                return;
            }

            // Student access.
            if (account.role === "student") {

                // Temporary compatibility for older approved records.
                const isApproved =
                    account.approved === true ||
                    (
                        typeof account.approved === "undefined" &&
                        account.status === "approved"
                    );

                if (!isApproved) {

                    await auth.signOut();

                    message.textContent =
                        "Your registration is awaiting administrator approval.";

                    return;
                }

                window.location.href = "dashboard.html";
                return;
            }

            await auth.signOut();

            message.textContent =
                "Your account role is not recognized.";

        } catch (error) {

            console.error("Login error:", error);

            const errors = {
                "auth/user-not-found": "No account exists with this email.",
                "auth/wrong-password": "Incorrect password.",
                "auth/invalid-credential": "Incorrect email or password.",
                "auth/invalid-email": "Please enter a valid email address.",
                "auth/too-many-requests": "Too many attempts. Please try again later.",
                "permission-denied": "Database permission denied. Please contact the administrator."
            };

            message.textContent =
                errors[error.code] || error.message;

        } finally {

            if (loginButton) {
                loginButton.disabled = false;
                loginButton.textContent = "Login";
            }

        }

    });

});
            
