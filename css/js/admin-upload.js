document.getElementById("uploadForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const title = document.getElementById("title").value;
    const grade = document.getElementById("grade").value;
    const subject = document.getElementById("subject").value;
    const type = document.getElementById("contentType").value;
    const file = document.getElementById("file").files[0];

    const message = document.getElementById("message");

    if(!file){

        message.style.color = "red";
        message.innerHTML = "Please choose a file.";

        return;

    }

    try{

        message.style.color = "blue";
        message.innerHTML = "Uploading...";

        const storageRef = firebase.storage().ref();

        const filePath =
        subject + "/" +
        grade + "/" +
        Date.now() + "_" +
        file.name;

        const uploadTask =
        storageRef.child(filePath).put(file);

        uploadTask.on(

            "state_changed",

            function(snapshot){

                const progress =
                (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;

                message.style.color = "blue";
                message.innerHTML =
                "Uploading " +
                progress.toFixed(0) +
                "%";

            },

            function(error){

                message.style.color = "red";
                message.innerHTML = error.message;

            },

            async function(){

                const downloadURL =
                await uploadTask.snapshot.ref.getDownloadURL();

                await db.collection("content").add({

                    title:title,

                    grade:grade,

                    subject:subject,

                    type:type,

                    fileName:file.name,

                    fileSize:file.size,

                    downloadURL:downloadURL,

                    storagePath:filePath,

                    uploadedAt:
                    firebase.firestore.FieldValue.serverTimestamp()

                });

                message.style.color = "green";
                message.innerHTML =
                "Content uploaded successfully.";

                document.getElementById("uploadForm").reset();

            }

        );

    }

    catch(error){

        message.style.color = "red";
        message.innerHTML = error.message;

    }

});
