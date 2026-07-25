// =============================
// NOTES MANAGEMENT
// =============================

const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");

let notes = [];

if (noteForm) {

    noteForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const title = document.getElementById("noteTitle").value;
        const subject = document.getElementById("noteSubject").value;
        const grade = document.getElementById("noteGrade").value;
        const file = document.getElementById("noteFile").files[0];

        notes.push({
            title,
            subject,
            grade,
            fileName: file.name
        });

        displayNotes();

        noteForm.reset();

        alert("PDF added successfully.");

    });

}

function displayNotes() {

    notesList.innerHTML = "";

    notes.forEach((note, index) => {

        notesList.innerHTML += `

        <div class="card">

            <h3>${note.title}</h3>

            <p>${note.subject}</p>

            <p>${note.grade}</p>

            <p>${note.fileName}</p>

            <button onclick="deleteNote(${index})">

                Delete

            </button>

        </div>

        <br>

        `;

    });

}

function deleteNote(index){

    notes.splice(index,1);

    displayNotes();

                }
