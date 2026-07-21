document.getElementById("adminLoginForm").addEventListener("submit", async (e)=>{

e.preventDefault();

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const message=document.getElementById("message");

try{

await auth.signInWithEmailAndPassword(email,password);

if(email==="phathumbedzi1919@gmail.com"){

window.location.href="admin.html";

}else{

message.innerHTML="Access Denied.";

auth.signOut();

}

}catch(error){

message.innerHTML=error.message;

}

});