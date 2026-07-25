// =============================
// PHATHU ACADEMY ADMIN V2
// =============================

// Logout Button
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await firebase.auth().signOut();

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}


// =============================
// PAGE NAVIGATION
// =============================

const pages = document.querySelectorAll(".page");

function showPage(pageId) {

    pages.forEach(page => {

        page.style.display = "none";

    });

    document.getElementById(pageId).style.display = "block";

}

// Dashboard is the default page
showPage("dashboard");


// =============================
// PLACEHOLDER FUNCTIONS
// =============================

document.getElementById("uploadPDFBtn")?.addEventListener("click", () => {

    alert("PDF Upload Module - Coming Next");

});

document.getElementById("uploadVideoBtn")?.addEventListener("click", () => {

    alert("Video Upload Module - Coming Next");

});

document.getElementById("postAnnouncement")?.addEventListener("click", () => {

    alert("Announcement Module - Coming Next");

});
