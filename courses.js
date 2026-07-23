// ==========================================
// Authentication Check
// ==========================================

auth.onAuthStateChanged(async(user)=>{

    if(!user){

        window.location.href="login.html";

        return;

    }

    loadCourses();

});

// ==========================================
// Save Course
// ==========================================

document.getElementById("saveCourse")

.addEventListener("click",async()=>{

    const title=document.getElementById("courseTitle").value.trim();

    const category=document.getElementById("category").value;

    const grade=document.getElementById("grade").value;

    const subject=document.getElementById("subject").value;

    const description=document.getElementById("description").value.trim();

    if(
        title==="" ||
        category==="" ||
        grade==="" ||
        subject===""
    ){

        alert("Please complete all required fields.");

        return;

    }

    try{

        await db.collection("courses").add({

            title:title,

            category:category,

            grade:grade,

            subject:subject,

            description:description,

            status:"Published",

            createdAt:new Date()

        });

        alert("Course created successfully.");

        document.getElementById("courseTitle").value="";
        document.getElementById("category").value="";
        document.getElementById("grade").value="";
        document.getElementById("subject").value="";
        document.getElementById("description").value="";

        loadCourses();

    }

    catch(error){

        alert(error.message);

    }

});

// ==========================================
// Load Courses
// ==========================================

async function loadCourses(){

    const table=document.getElementById("courseTable");

    table.innerHTML="";

    const snapshot=await db.collection("courses").orderBy("createdAt","desc").get();

    snapshot.forEach((doc)=>{

        const course=doc.data();

        table.innerHTML+=`

        <tr>

            <td>${course.title}</td>

            <td>${course.category}</td>

            <td>${course.grade}</td>

            <td>${course.subject}</td>

            <td>${course.status}</td>

            <td>

                <button
                class="editBtn"
                onclick="editCourse('${doc.id}')">

                Edit

                </button>

                <button
                class="deleteBtn"
                onclick="deleteCourse('${doc.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// Delete Course
// ==========================================

async function deleteCourse(id){

    if(!confirm("Delete this course?")) return;

    await db.collection("courses")

    .doc(id)

    .delete();

    loadCourses();

}

// ==========================================
// Edit Course
// ==========================================

function editCourse(id){

    alert("Editing courses will be added in Module 4.");

}

// ==========================================
// Search
// ==========================================

document.getElementById("searchCourse")

.addEventListener("keyup",function(){

    const filter=this.value.toLowerCase();

    const rows=document.querySelectorAll("#courseTable tr");

    rows.forEach(row=>{

        row.style.display=row.innerText

        .toLowerCase()

        .includes(filter)

        ? ""

        : "none";

    });

});

// ==========================================
// Logout
// ==========================================

document.getElementById("logoutBtn")

.addEventListener("click",async()=>{

    await auth.signOut();

    window.location.href="login.html";

});