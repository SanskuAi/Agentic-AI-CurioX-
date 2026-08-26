const API = "http://localhost:5000/api/auth";

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        try {

            const response = await fetch(`${API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role
                })

            });

            const data = await response.json();

            document.getElementById("message").textContent =
                data.message;

            if (response.ok) {

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 500);

            }

        } catch (error) {

            document.getElementById("message").textContent =
                "Server connection failed";

                message.className = "error";
        }

    });
}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        try {

            const response = await fetch(`${API}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),

            });

            const data = await response.json();

            // document.getElementById("loginMessage").textContent =
            //     data.message;

            const loginMessage = document.getElementById("loginMessage")

            if(loginForm){
                loginMessage.textContent = data.message || "login Fail"
                loginMessage.className = "error"
            }

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                if (data.user.role === "department") {

                    window.location.href =
                        "department.html";

                } else {

                    window.location.href =
                        "dashboard.html";

                }

            }

        } catch (error) {

            document.getElementById("loginMessage").textContent =
                "Server connection failed";
                loginMessage.className = "error";

        }

    });

}