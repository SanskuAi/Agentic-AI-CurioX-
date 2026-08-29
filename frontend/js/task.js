const API = "http://localhost:5000/api/tasks";

const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");

// ==================== CHECK LOGIN ====================
if (!token || !taskId) {
    window.location.href = "login.html";
}


// ==================== FORM ====================
const form = document.getElementById("completeForm");
const message = document.getElementById("message");

// ==================== SUBMIT COMPLETION ====================
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const completionMessage =
            document.getElementById("completionMessage").value;

        const afterImage =
            document.getElementById("afterImage").files[0];

        // ==================== CHECK IMAGE ====================
        if (!afterImage) {
            message.textContent = "Please upload an AFTER image.";
            return;
        }

        // ==================== FORM DATA ====================
        const formData = new FormData();

        formData.append("completionMessage", completionMessage);
        formData.append("afterImage", afterImage);

        message.textContent =
            "🤖 AI is checking the evidence...";

        try {
            const response = await fetch(
                `${API}/${taskId}/complete`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            console.log("Verification response:", data);

            // ==================== ERROR ====================
            if (!response.ok) {
                message.textContent =
                    data.message || "Failed to complete task";
                return;
            }

            // ==================== AI VERIFICATION ====================
            if (
                data.verification &&
                data.verification.result
            ) {
                message.innerHTML = `
                    <div class="ai-result">
                        <h2>🤖 AI Verification</h2>

                        <h3>
                            ${data.verification.result}
                        </h3>

                        <p>
                            ${data.verification.reason || ""}
                        </p>
                    </div>
                `;
            } else {
                message.textContent =
                    "Task submitted successfully.";
            }

        } catch (error) {
            console.error("TASK COMPLETION ERROR:", error);

            message.textContent =
                "Server connection failed";
        }
    });
}