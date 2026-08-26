const token = localStorage.getItem("token");

const userData = localStorage.getItem("user");


// CHECK LOGIN

if (!token || !userData) {

    window.location.href = "login.html";

}


// USER DATA

const user = JSON.parse(userData);

document.getElementById("userName").textContent =
    user.name;

document.getElementById("welcomeName").textContent =
    user.name;


// LOGOUT

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.href = "login.html";

    });