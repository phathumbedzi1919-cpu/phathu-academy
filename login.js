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

            message.innerHTML = "Student account not found.";

            return;

        }

        const student = doc.data();

        if (student.approved === false) {

            message.innerHTML =
                "Your account is still waiting for approval from Phathu Academy.";

            auth.signOut();

            return;

        }

        window.location.href = "dashboard.html";

    } catch (error) {

        message.innerHTML = error.message;

    }

});