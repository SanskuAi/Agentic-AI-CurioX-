
const API = "http://localhost:5000/api/auth";

// ==================== REGISTER ====================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        const message = document.getElementById("message");

        if (!name || !email || !password) {
            message.textContent = "All fields are required";
            message.className = "error";
            return;
        }

        try {

            // ==================== SEND REGISTER ====================

            const response = await fetch(`${API}/register`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role
                })
            });

            // ==================== READ RESPONSE ====================

            const text = await response.text();

            console.log("REGISTER STATUS:", response.status);
            console.log("REGISTER RESPONSE:", text);

            let data;

            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("REGISTER RESPONSE IS NOT JSON:", text);

                message.textContent =
                    "Invalid server response. Check backend terminal.";

                message.className = "error";

                return;
            }

            // ==================== RESULT ====================

            message.textContent =
                data.message || "Registration completed";

            if (response.ok) {

                message.className = "success";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);

            } else {

                message.className = "error";
            }

        } catch (error) {

            console.error("REGISTER ERROR:", error);

            message.textContent =
                "Server connection failed";

            message.className = "error";
        }
    });
}


// ==================== LOGIN ====================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const loginMessage =
            document.getElementById("loginMessage");

        if (!email || !password) {

            loginMessage.textContent =
                "Email and password are required";

            loginMessage.className = "error";

            return;
        }

        try {

            // ==================== SEND LOGIN ====================

            const response = await fetch(`${API}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            });


            // ==================== READ RESPONSE ====================

            const text = await response.text();

            console.log("LOGIN STATUS:", response.status);
            console.log("LOGIN RESPONSE:", text);

            let data;

            try {

                data = JSON.parse(text);

            } catch (error) {

                console.error(
                    "LOGIN RESPONSE IS NOT JSON:",
                    text
                );

                loginMessage.textContent =
                    "Invalid server response. Check backend terminal.";

                loginMessage.className = "error";

                return;
            }


            // ==================== LOGIN ERROR ====================

            if (!response.ok) {

                loginMessage.textContent =
                    data.message || "Login failed";

                loginMessage.className = "error";

                return;
            }


            // ==================== SAVE LOGIN DATA ====================

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // ==================== ROLE REDIRECT ====================

            if (data.user.role === "department") {

                window.location.href =
                    "department.html";

            } else if (data.user.role === "admin") {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "dashboard.html";
            }

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            loginMessage.textContent =
                "Server connection failed";

            loginMessage.className =
                "error";
        }
    });
}

