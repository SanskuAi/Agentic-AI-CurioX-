const API = "http://localhost:5000/api/tasks";

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");


// ==================== CHECK LOGIN ====================

if (!token || !userData) {

    window.location.href = "login.html";

    throw new Error("User not logged in");
}


const user = JSON.parse(userData);


// ==================== CHECK DEPARTMENT ROLE ====================

if (user.role !== "department") {

    window.location.href = "dashboard.html";

    throw new Error("Unauthorized user");
}


// ==================== DEPARTMENT NAME ====================

const departmentName =
    document.getElementById("departmentName");

if (departmentName) {

    departmentName.textContent =
        user.name || "Department";

}


// ==================== CONTAINER ====================

const container =
    document.getElementById("tasksContainer");


// ==================== LOGOUT ====================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.href =
            "login.html";

    });

}


// ==================== LOAD TASKS ====================

async function loadTasks() {

    try {

        const response = await fetch(API, {

            headers: {

                Authorization:
                    "Bearer " + token

            }

        });


        const tasks = await response.json();

        console.log("Tasks:", tasks);


        // ==================== API ERROR ====================

        if (!response.ok) {

            container.innerHTML = `

                <div class="error-card">

                    <h3>
                        Failed to load tasks
                    </h3>

                    <p>
                        ${
                            tasks.message ||
                            "Something went wrong."
                        }
                    </p>

                </div>

            `;

            return;
        }


        // ==================== NO TASKS ====================

        if (!Array.isArray(tasks) || tasks.length === 0) {

            container.innerHTML = `

                <div class="empty-card">

                    <div class="empty-icon">
                        ✓
                    </div>

                    <h3>
                        No tasks assigned
                    </h3>

                    <p>
                        There are currently no infrastructure
                        complaints assigned to your department.
                    </p>

                </div>

            `;

            return;
        }


        // ==================== CLEAR LOADING ====================

        container.innerHTML = "";


        // ==================== CREATE TASK CARDS ====================

        tasks.forEach((task) => {

            const report = task.report;


            // Safety check

            if (!report) {

                return;

            }


            const card =
                document.createElement("div");

            card.className =
                "task-card";


            // ==================== VALUES ====================

            const priority =
                report.priority || "Medium";

            const severity =
                report.severity || "Medium";

            const status =
                task.status || "Assigned";


            // ==================== CARD ====================

            card.innerHTML = `

                <!-- TASK HEADER -->

                <div class="task-header">

                    <div>

                        <span class="task-label">
                            INFRASTRUCTURE COMPLAINT
                        </span>

                        <h2>
                            ${escapeHTML(report.problem)}
                        </h2>

                    </div>

                    <span class="status ${getStatusClass(status)}">
                        ${escapeHTML(status)}
                    </span>

                </div>


                <!-- LOCATION -->

                <div class="location">

                    <span class="icon">
                        📍
                    </span>

                    <div>

                        <small>
                            Location
                        </small>

                        <p>
                            ${escapeHTML(report.location)}
                        </p>

                    </div>

                </div>


                <!-- AI ANALYSIS -->

                <div class="ai-section">

                    <div class="section-title">

                        <span>
                            🤖
                        </span>

                        <h3>
                            AI Analysis
                        </h3>

                    </div>


                    <div class="analysis-grid">


                        <!-- CATEGORY -->

                        <div class="analysis-item">

                            <small>
                                Category
                            </small>

                            <strong>
                                ${escapeHTML(
                                    report.category || "N/A"
                                )}
                            </strong>

                        </div>


                        <!-- SEVERITY -->

                        <div class="analysis-item">

                            <small>
                                Severity
                            </small>

                            <strong class="severity-${severity.toLowerCase()}">

                                ${escapeHTML(severity)}

                            </strong>

                        </div>


                        <!-- PRIORITY -->

                        <div class="analysis-item">

                            <small>
                                Priority
                            </small>

                            <strong class="priority-${priority.toLowerCase()}">

                                ${escapeHTML(priority)}

                            </strong>

                        </div>


                        <!-- RELATED -->

                        <div class="analysis-item">

                            <small>
                                Related Complaints
                            </small>

                            <strong>
                                ${
                                    report.relatedComplaintCount ||
                                    1
                                }
                            </strong>

                        </div>


                    </div>

                </div>


                <!-- AI SUMMARY -->

                <div class="summary-box">

                    <h3>
                        📋 AI Complaint Summary
                    </h3>

                    <p>

                        ${
                            escapeHTML(
                                report.aiSummary ||
                                report.problem
                            )
                        }

                    </p>

                </div>


                <!-- AI RECOMMENDATION -->

                <div class="recommendation-box">

                    <div class="recommendation-header">

                        <span>
                            🛠
                        </span>

                        <h3>
                            AI Resolution Recommendation
                        </h3>

                    </div>

                    <p>

                        ${
                            escapeHTML(
                                report.resolutionRecommendation ||
                                "No recommendation available."
                            )
                        }

                    </p>

                </div>


                <!-- AI REASON -->

                <div class="reason-box">

                    <h3>
                        💡 AI Reason
                    </h3>

                    <p>

                        ${
                            escapeHTML(
                                report.aiReason ||
                                "No AI reasoning available."
                            )
                        }

                    </p>

                </div>


                <!-- DEPARTMENT -->

                <div class="department-info">

                    <span>
                        Assigned Department
                    </span>

                    <strong>
                        ${escapeHTML(
                            task.department ||
                            report.department ||
                            "N/A"
                        )}
                    </strong>

                </div>


                <!-- ACTION -->

                <div class="task-footer">

                    <a
                        class="view-btn"
                        href="task.html?id=${task._id}"
                    >
                        View Task
                    </a>

                </div>

            `;


            container.appendChild(card);

        });


    } catch (error) {

        console.error(
            "LOAD TASK ERROR:",
            error
        );


        container.innerHTML = `

            <div class="error-card">

                <h3>
                    Server connection failed
                </h3>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

            </div>

        `;

    }

}


// ==================== ESCAPE HTML ====================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// ==================== STATUS CLASS ====================

function getStatusClass(status) {

    return status
        .toLowerCase()
        .replace(/\s+/g, "-");

}


// ==================== START ====================

loadTasks();