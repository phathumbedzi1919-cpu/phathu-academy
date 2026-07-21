const studentsDiv = document.getElementById("students");

const totalStudents = document.getElementById("totalStudents");
const pendingStudents = document.getElementById("pendingStudents");
const approvedStudents = document.getElementById("approvedStudents");

db.collection("students").onSnapshot((snapshot)=>{

studentsDiv.innerHTML="";

let total=0;
let pending=0;
let approved=0;

snapshot.forEach((doc)=>{

total++;

const student=doc.data();

if(student.approved){

approved++;

}else{

pending++;

}

studentsDiv.innerHTML+=`

<div class="student-card">

<h3>${student.fullname}</h3>

<p><strong>Email:</strong> ${student.email}</p>

<p><strong>Phone:</strong> ${student.phone}</p>

<p><strong>Grade:</strong> ${student.grade}</p>

<p><strong>Subjects:</strong> ${student.subjects}</p>

<p><strong>Status:</strong>

${student.approved ? "Approved ✅" : "Pending ⏳"}

</p>

<button onclick="approveStudent('${doc.id}')">

Approve

</button>

<button onclick="deleteStudent('${doc.id}')">

Delete

</button>

</div>

`;

});

totalStudents.innerHTML=total;
pendingStudents.innerHTML=pending;
approvedStudents.innerHTML=approved;

});

function approveStudent(id){

db.collection("students").doc(id).update({

approved:true,
payment:"paid"

});

alert("Student Approved Successfully.");

}

function deleteStudent(id){

if(confirm("Delete this student?")){

db.collection("students").doc(id).delete();

}

}