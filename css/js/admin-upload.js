document.getElementById("uploadForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const grade = document.getElementById("grade").value;
    const subject = document.getElementById("subject").value;
    const contentType = document.getElementById("contentType").value;
    const file = document.getElementById("file").files[0];

    const message = document.getElementById("message");

    if (!file) {
        message.innerHTML = "Please select a file.";
        return;
    }

    try {

        await db.collection("content").add({

            title: title,

            grade: grade,

            subject: subject,

            type: contentType,

            fileName: file.name,

            fileSize: file.size,

            uploadedAt: firebase.firestore.FieldValue.serverTimestamp()

        });

        message.style.color = "green";
        message.innerHTML = "Content uploaded successfully!";

        document.getElementById("uploadForm").reset();

    } catch (error) {

        message.style.color = "red";
        message.innerHTML = error.message;

    }

});
