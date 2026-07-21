const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", function () {

    // Get user input
    const title = document.getElementById("title").value;
    const subtitle = document.getElementById("subtitle").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;

    // Display text on poster
    document.getElementById("posterTitle").innerText = title;
    document.getElementById("posterSubtitle").innerText = subtitle;
    document.getElementById("posterDescription").innerText = description;
    document.getElementById("posterContact").innerText = contact;

    // Background image
    const file = document.getElementById("background").files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("poster").style.backgroundImage =
                `url('${e.target.result}')`;

        };

        reader.readAsDataURL(file);

    }

});
