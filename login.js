document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    try {

        const userCredential = await auth.signInWithEmailAndPassword(email, password);

        const user = userCredential.user;

        const doc = await db.collection("students").doc(user.uid).get();

        if (!doc.exists) {

            message.innerHTML = "Account not found.";

            await auth.signOut();

            return;

        }

        const account = doc.data();

        if (account.approved === false) {

            message.innerHTML = "Your account is still waiting for approval.";

            await auth.signOut();

            return;

        }

        // ROLE-BASED LOGIN

        if (account.role === "admin") {

            // Check user role

if (account.role === "admin") {

    window.location.href = "admin.html";

}

else if (account.role === "student") {

    window.location.href = "dashboard.html";

}

else {

    message.innerHTML = "Unknown account role.";

    await auth.signOut();

}

        }

        else if (account.role === "student") {

            window.location.href = "dashboard.html";

        }

        else {

            message.innerHTML = "Unknown account role.";

            await auth.signOut();

        }

    }

    catch (error) {

        message.innerHTML = error.message;

    }

});
