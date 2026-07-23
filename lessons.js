// =========================================
// Authentication
// =========================================

auth.onAuthStateChanged(async(user)=>{

    if(!user){

        window.location.href="login.html";

        return;

    }

    await loadCourses();

    await loadLessons();

});

// =========================================
// Load Courses
// =========================================

async function loadCourses(){

    const select=document.getElementById("courseSelect");

    select.innerHTML="<option value=''>Select Course</option>";

    const snapshot=await db.collection("courses")
    .orderBy("title")
    .get();

    snapshot.forEach((doc)=>{

        const course=doc.data();

        select.innerHTML+=`

        <option value="${doc.id}">

            ${course.title}

        </option>

        `;

    });

}

// =========================================
// Save Lesson
// =========================================

document.getElementById("saveLesson")

.addEventListener("click",async()=>{

    const courseId=document.getElementById("courseSelect").value;

    const lessonTitle=document.getElementById("lessonTitle").value.trim();

    const lessonDescription=document.getElementById("lessonDescription").value.trim();

    const videoUrl=document.getElementById("videoUrl").value.trim();

    const pdfUrl=document.getElementById("pdfUrl").value.trim();

    const homework=document.getElementById("homework").value.trim();

    if(courseId==="" || lessonTitle===""){

        alert("Please complete all required fields.");

        return;

    }

    try{

        await db.collection("lessons").add({

            courseId:courseId,

            lessonTitle:lessonTitle,

            lessonDescription:lessonDescription,

            videoUrl:videoUrl,

            pdfUrl:pdfUrl,

            homework:homework,

            published:true,

            createdAt:new Date()

        });

        alert("Lesson saved successfully.");

        document.getElementById("courseSelect").value="";
        document.getElementById("lessonTitle").value="";
        document.getElementById("lessonDescription").value="";
        document.getElementById("videoUrl").value="";
        document.getElementById("pdfUrl").value="";
        document.getElementById("homework").value="";

        loadLessons();

    }

    catch(error){

        alert(error.message);

    }

});

// =========================================
// Load Lessons
// =========================================

async function loadLessons(){

    const table=document.getElementById("lessonTable");

    table.innerHTML="";

    const lessons=await db.collection("lessons")
    .orderBy("createdAt","desc")
    .get();

    for(const lessonDoc of lessons.docs){

        const lesson=lessonDoc.data();

        let courseName="Unknown Course";

        try{

            const courseDoc=await db.collection("courses")
            .doc(lesson.courseId)
            .get();

            if(courseDoc.exists){

                courseName=courseDoc.data().title;

            }

        }catch(e){}

        table.innerHTML+=`

        <tr>

            <td>${courseName}</td>

            <td>${lesson.lessonTitle}</td>

            <td>

                ${lesson.videoUrl ? "🎥" : "-"}

            </td>

            <td>

                ${lesson.pdfUrl ? "📄" : "-"}

            </td>

            <td>

                <button
                class="editBtn"
                onclick="editLesson('${lessonDoc.id}')">

                Edit

                </button>

                <button
                class="deleteBtn"
                onclick="deleteLesson('${lessonDoc.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    }

}

// =========================================
// Delete Lesson
// =========================================

async function deleteLesson(id){

    if(!confirm("Delete this lesson?")) return;

    await db.collection("lessons")
    .doc(id)
    .delete();

    loadLessons();

}

// =========================================
// Edit Lesson
// =========================================

function editLesson(id){

    alert("Lesson editing will be added in Module 5.");

}

// =========================================
// Search Lessons
// =========================================

document.getElementById("searchLesson")

.addEventListener("keyup",function(){

    const filter=this.value.toLowerCase();

    const rows=document.querySelectorAll("#lessonTable tr");

    rows.forEach(row=>{

        row.style.display=row.innerText
        .toLowerCase()
        .includes(filter)

        ? ""

        : "none";

    });

});

// =========================================
// Logout
// =========================================

document.getElementById("logoutBtn")

.addEventListener("click",async()=>{

    await auth.signOut();

    window.location.href="login.html";

});