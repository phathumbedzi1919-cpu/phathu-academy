// =========================
// PAGE NAVIGATION
// =========================

function hideAllPages() {

    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("studentsPage").style.display = "none";
    document.getElementById("coursesPage").style.display = "none";
    document.getElementById("notesPage").style.display = "none";
    document.getElementById("videosPage").style.display = "none";
    document.getElementById("quizzesPage").style.display = "none";
    document.getElementById("announcementsPage").style.display = "none";
    document.getElementById("settingsPage").style.display = "none";

}

function showPage(page) {

    hideAllPages();

    document.getElementById(page).style.display = "block";

}

// Show dashboard when the page loads
showPage("dashboardPage");


// =========================
// LOGOUT
// =========================

document.getElementById("logoutBtn").addEventListener("click", async () => {

    try {

        await firebase.auth().signOut();

        window.location.href = "index.html";

    } catch (error) {

        alert(error.message);

    }

});
