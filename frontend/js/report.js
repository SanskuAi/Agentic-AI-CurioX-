const API = "http://localhost:5000/api/reports";

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");


// CHECK LOGIN

if (!token || !userData) {
    window.location.href = "login.html";
}


// USER DATA

const user = JSON.parse(userData);


// FORM

const reportForm =
    document.getElementById("reportForm");

const message =
    document.getElementById("message");


if (reportForm) {

    reportForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        // GET FORM VALUES

        const problem =
            document.getElementById("problem").value;

        const location =
            document.getElementById("location").value;

        const image =
            document.getElementById("image").files[0];


        // FORM DATA

        const formData = new FormData();

        formData.append("userId", user.id);
        formData.append("problem", problem);
        formData.append("location", location);


        if (image) {
            formData.append("image", image);
        }


        try {

            message.textContent =
                "🤖 AI is analyzing your report...";


            // SEND REPORT TO BACKEND

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData

            });


            // GET BACKEND RESPONSE

            const data = await response.json();


            console.log("Backend response:", data);


            // ERROR

            if (!response.ok) {

                message.textContent =
                    data.message || "Report submission failed";

                message.className = "error";

                return;
            }


            // AI RESULT

            if (data.ai) {

                message.className = "";

                message.innerHTML = `

                    <div class="ai-result">

                        <h3>🤖 AI Analysis Complete</h3>

                        <p>
                            <strong>Category:</strong>
                            ${data.ai.category}
                        </p>

                        <p>
                            <strong>Priority:</strong>
                            ${data.ai.priority}
                        </p>

                        <p>
                            <strong>Department:</strong>
                            ${data.ai.department}
                        </p>

                        <p>
                            <strong>Similar Reports:</strong>
                            ${data.ai.similarReports}
                        </p>

                        <p>
                            <strong>AI Reason:</strong>
                            ${data.ai.reason}
                        </p>

                    </div>

                `;

            } else {

                message.textContent =
                    data.message || "Report submitted successfully";
            }


            // RESET FORM

            reportForm.reset();


            // GO TO DASHBOARD

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 3000);


        } catch (error) {

            console.error(
                "REPORT ERROR:",
                error
            );

            message.textContent =
                "Server connection failed";

            message.className = "error";
        }

    });

}