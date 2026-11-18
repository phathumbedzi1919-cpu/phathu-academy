
document.getElementById("registerForm").addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const message = document.getElementById("message");
        const button = document.getElementById("registerButton");

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        message.textContent = "";

        if (password.length < 8) {
            message.textContent = "Password must have at least 8 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        let createdUser = null;

        try {
            button.disabled = true;
            button.textContent = "Submitting...";

            await window.academy.ready;

            const auth = window.academy.auth;
            const db = window.academy.db;

            const result = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            createdUser = result.user;

            await db.collection("users")
                .doc(createdUser.uid)
                .set({
                    uid: createdUser.uid,
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    role: "student",
                    status: "pending",
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            message.style.color = "#22c994";
            message.textContent =
                "Application submitted successfully! Your account is awaiting administrator approval.";

            document.getElementById("registerForm").reset();

            await auth.signOut();

        } catch (error) {

            console.error("Registration error:", error);

            // Do not delete the Authentication account if the
            // Firestore profile write fails.
            if (createdUser) {
                try {
                    await window.academy.auth.signOut();
                } catch (signOutError) {
                    console.error(signOutError);
                }
            }

            message.style.color = "#ff7777";

            if (error.code === "permission-denied") {
                message.textContent =
                    "Your account was created, but its profile could not be saved. Please contact the administrator. Do not register again.";
            } else {
                message.textContent = error.message;
            }

        } finally {
            button.disabled = false;
            button.textContent = "REQUEST ACCESS";
        }
    }
);
        
