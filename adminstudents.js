
document.addEventListener("DOMContentLoaded", async () => {

    const auth = window.academy.auth;
    const db = window.academy.db;

    const studentsList = document.getElementById("studentsList");
    const studentMessage = document.getElementById("studentMessage");

    if (!studentsList) {
        console.error("Students list container not found.");
        return;
    }

    function showMessage(message, color = "black") {
        if (studentMessage) {
            studentMessage.textContent = message;
            studentMessage.style.color = color;
        }
    }

    // Verify administrator account.
    auth.onAuthStateChanged(async (user) => {

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        try {
            const adminDoc = await db
                .collection("users")
                .doc(user.uid)
                .get();

            if (!adminDoc.exists ||
                adminDoc.data().role !== "admin") {

                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

            loadStudents();

        } catch (error) {
            console.error(error);
            showMessage(
                "Could not verify administrator access: " + error.message,
                "red"
            );
        }
    });

    // Load registered students.
    function loadStudents() {

        showMessage("Loading student registrations...", "blue");

        db.collection("users")
            .where("role", "==", "student")
            .onSnapshot(snapshot => {

                studentsList.innerHTML = "";

                if (snapshot.empty) {
                    showMessage("No student registrations found.");
                    studentsList.textContent =
                        "No students have registered yet.";
                    return;
                }

                showMessage(
                    snapshot.size + " student account(s) found.",
                    "green"
                );

                snapshot.forEach(doc => {

                    const student = doc.data();

                    const name =
                        student.fullName ||
                        student.name ||
                        student.displayName ||
                        "Name not provided";

                    const email = student.email || "No email";
                    const approved = student.approved === true;
                    const rejected = student.rejected === true;

                    const card = document.createElement("div");
                    card.className = "card";

                    const heading = document.createElement("h3");
                    heading.textContent = name;

                    const emailText = document.createElement("p");
                    emailText.textContent = email;

                    const status = document.createElement("p");
                    status.style.fontSize = "14px";

                    if (approved) {
                        status.textContent = "Approved";
                        status.style.color = "green";
                    } else if (rejected) {
                        status.textContent = "Rejected";
                        status.style.color = "red";
                    } else {
                        status.textContent = "Pending approval";
                        status.style.color = "#b7791f";
                    }

                    const approveButton =
                        document.createElement("button");

                    approveButton.textContent =
                        approved ? "Already approved" : "Approve";

                    approveButton.disabled = approved;

                    approveButton.addEventListener("click", async () => {
                        await updateStudent(doc.id, {
                            approved: true,
                            rejected: false
                        });
                    });

                    const rejectButton =
                        document.createElement("button");

                    rejectButton.textContent = "Reject";

                    rejectButton.addEventListener("click", async () => {
                        await updateStudent(doc.id, {
                            approved: false,
                            rejected: true
                        });
                    });

                    card.appendChild(heading);
                    card.appendChild(emailText);
                    card.appendChild(status);
                    card.appendChild(approveButton);
                    card.appendChild(rejectButton);

                    studentsList.appendChild(card);
                });

            }, error => {
                console.error(error);
                showMessage(
                    "Unable to load students: " + error.message,
                    "red"
                );
            });
    }

    // Update student approval.
    async function updateStudent(studentId, changes) {

        try {
            await db.collection("users")
                .doc(studentId)
                .update(changes);

            showMessage(
                "Student account updated successfully.",
                "green"
            );

        } catch (error) {
            console.error(error);

            showMessage(
                "Could not update student: " + error.message,
                "red"
            );
        }
    }

});
