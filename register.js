document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const parentPhone = document.getElementById("parentPhone").value;
    const grade = document.getElementById("grade").value;
    const subjects = document.getElementById("subjects").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    if (password !== confirmPassword) {
        message.innerHTML = "Passwords do not match.";
        return;
    }

    try {

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        const user = userCredential.user;

        await db.collection("students").doc(user.uid).set({
            fullname: fullname,
            email: email,
            phone: phone,
            parentPhone: parentPhone,
            grade: grade,
            subjects: subjects,
            approved: false,
            payment: "pending"
            role: "student",
        });

        message.innerHTML = "Account created successfully! Please wait for approval.";

    } catch (error) {

        message.innerHTML = error.message;

    }

});
