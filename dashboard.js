// Check if student is logged in
auth.onAuthStateChanged(async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    try {

        const doc = await db.collection("students").doc(user.uid).get();

        if (!doc.exists) {

            alert("Student record not found.");

            await auth.signOut();

            window.location.href = "login.html";

            return;

        }

        const student = doc.data();

        // Top bar
        document.getElementById("studentName").innerHTML =
            student.fullname;

        // Welcome message
        document.getElementById("welcomeName").innerHTML =
            student.fullname.split(" ")[0];

        // Profile Card
        document.getElementById("profileName").innerHTML =
            student.fullname;

        document.getElementById("profileGrade").innerHTML =
            student.grade;

        document.getElementById("profileSubjects").innerHTML =
            student.subjects;

        // Payment Status

        if(student.payment){

            document.getElementById("paymentStatus").innerHTML =
                student.payment;

        }else{

            document.getElementById("paymentStatus").innerHTML =
                "Pending";

        }

        // Statistics (temporary values)

        document.getElementById("courseCount").innerHTML = 2;

        document.getElementById("lessonCount").innerHTML = 0;

        document.getElementById("quizCount").innerHTML = 0;

    }

    catch(error){

        console.log(error);

        alert(error.message);

    }

});


// Logout

document.getElementById("logoutBtn").addEventListener("click", async()=>{

    await auth.signOut();

    window.location.href="login.html";

});