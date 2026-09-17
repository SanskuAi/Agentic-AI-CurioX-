const API = "http://localhost:5000/api/reports";

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");


// ==================== CHECK LOGIN ====================

if (!token || !userData) {

    window.location.href = "login.html";

}


// ==================== USER DATA ====================

let user;

try {

    user = JSON.parse(userData);

} catch (error) {

    console.error("USER DATA ERROR:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}


// ==================== USER NAME ====================

const userName = document.getElementById("userName");
const welcomeName = document.getElementById("welcomeName");

if (userName) {
    userName.textContent = user.name || "User";
}

if (welcomeName) {
    welcomeName.textContent = user.name || "User";
}


// ==================== LOGOUT ====================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    });

}


// ==================== HTML ESCAPE ====================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==================== STATUS CLASS ====================

function getStatusClass(status) {

    if (status === "Likely Resolved") {
        return "status-resolved";
    }

    if (status === "Needs Reinspection") {
        return "status-reinspection";
    }

    if (status === "In Progress") {
        return "status-progress";
    }

    if (status === "Completed") {
        return "status-completed";
    }

    return "status-assigned";
}


// ==================== PRIORITY CLASS ====================

function getPriorityClass(priority) {

    if (priority === "High") {
        return "priority-high";
    }

    if (priority === "Low") {
        return "priority-low";
    }

    return "priority-medium";
}


// ==================== LOAD REPORTS ====================

async function loadReports() {

    const container =
        document.getElementById("recentReports");

    try {

        if (container) {

            container.innerHTML = `
                <div class="loading">
                    Loading your reports...
                </div>
            `;

        }


        // ==================== API REQUEST ====================

        const response = await fetch(API, {

            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });


        const data = await response.json();


        // ==================== API ERROR ====================

        if (!response.ok) {

            console.error(
                "REPORT API ERROR:",
                data
            );

            if (container) {

                container.innerHTML = `
                    <div class="empty error">
                        ${escapeHTML(
                            data.message ||
                            "Failed to load reports."
                        )}
                    </div>
                `;

            }

            return;
        }


        // ==================== REPORT LIST ====================

        const reports = Array.isArray(data)
            ? data
            : [];


        // ==================== CURRENT USER REPORTS ====================

        const myReports = reports.filter(
            (report) => {

                if (!report.user) {
                    return false;
                }

                // If populated user object
                if (typeof report.user === "object") {

                    return (
                        String(report.user._id) ===
                        String(user._id)
                    );

                }

                // If user is only ObjectId
                return (
                    String(report.user) ===
                    String(user._id)
                );

            }
        );


        // ==================== SORT BY LATEST ====================

        myReports.sort((a, b) => {

            const dateA =
                new Date(a.createdAt || 0);

            const dateB =
                new Date(b.createdAt || 0);

            return dateB - dateA;

        });


        // ==================== COUNTS ====================

        const total =
            myReports.length;


        const highPriority =
            myReports.filter(
                (report) =>
                    report.priority === "High"
            ).length;


        const pending =
            myReports.filter(
                (report) => {

                    return (
                        report.status === "Assigned" ||
                        report.status === "In Progress" ||
                        report.status === "Completed"
                    );

                }
            ).length;


        const resolved =
            myReports.filter(
                (report) => {

                    return (
                        report.status === "Likely Resolved" ||
                        report.verificationStatus ===
                            "Likely Resolved"
                    );

                }
            ).length;


        const reinspection =
            myReports.filter(
                (report) => {

                    return (
                        report.status ===
                            "Needs Reinspection" ||
                        report.verificationStatus ===
                            "Needs Reinspection"
                    );

                }
            ).length;


        // ==================== UPDATE STATS ====================

        document.getElementById(
            "totalReports"
        ).textContent = total;


        document.getElementById(
            "highPriorityReports"
        ).textContent = highPriority;


        document.getElementById(
            "pendingReports"
        ).textContent = pending;


        document.getElementById(
            "resolvedReports"
        ).textContent = resolved;


        document.getElementById(
            "reinspectionReports"
        ).textContent = reinspection;


        // ==================== NO REPORTS ====================

        if (myReports.length === 0) {

            if (container) {

                container.innerHTML = `
                    <div class="empty">

                        <div class="empty-icon">
                            📋
                        </div>

                        <h3>
                            No reports yet
                        </h3>

                        <p>
                            You have not submitted any
                            infrastructure complaints.
                        </p>

                        <a
                            href="report.html"
                            class="empty-btn"
                        >
                            Report a Problem
                        </a>

                    </div>
                `;

            }

            return;
        }


        // ==================== RECENT REPORTS ====================

        if (!container) {
            return;
        }


        container.innerHTML = "";


        myReports
            .slice(0, 5)
            .forEach((report) => {


                const card =
                    document.createElement("div");

                card.className =
                    "report-card";


                const status =
                    report.verificationStatus ||
                    report.status ||
                    "Assigned";


                const priority =
                    report.priority ||
                    "Medium";


                const department =
                    report.department ||
                    "Not assigned";


                const category =
                    report.category ||
                    "Other";


                const relatedCount =
                    report.relatedComplaintCount ||
                    1;


                card.innerHTML = `

                    <div class="report-top">

                        <div>

                            <h3>
                                ${escapeHTML(
                                    report.problem
                                )}
                            </h3>

                            <p class="location">

                                📍
                                ${escapeHTML(
                                    report.location
                                )}

                            </p>

                        </div>


                        <span
                            class="status ${getStatusClass(
                                status
                            )}"
                        >
                            ${escapeHTML(status)}
                        </span>

                    </div>


                    <div class="report-details">


                        <div class="detail">

                            <span class="detail-label">
                                Category
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(category)}
                            </span>

                        </div>


                        <div class="detail">

                            <span class="detail-label">
                                Priority
                            </span>

                            <span
                                class="detail-value ${getPriorityClass(
                                    priority
                                )}"
                            >
                                ${escapeHTML(priority)}
                            </span>

                        </div>


                        <div class="detail">

                            <span class="detail-label">
                                Department
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(department)}
                            </span>

                        </div>


                        <div class="detail">

                            <span class="detail-label">
                                Related Reports
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(
                                    relatedCount
                                )}
                            </span>

                        </div>


                    </div>


                    ${
                        report.aiSummary
                            ? `
                                <div class="ai-summary">

                                    <span class="ai-label">
                                        🤖 AI Analysis
                                    </span>

                                    <p>
                                        ${escapeHTML(
                                            report.aiSummary
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                    }


                    ${
                        report.resolutionRecommendation
                            ? `
                                <div class="recommendation">

                                    <span class="recommendation-label">
                                        AI Recommendation
                                    </span>

                                    <p>
                                        ${escapeHTML(
                                            report.resolutionRecommendation
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                    }


                    ${
                        status === "Needs Reinspection"
                            ? `
                                <div class="reinspection-note">

                                    🔍
                                    AI has marked this complaint
                                    for reinspection.

                                </div>
                            `
                            : ""
                    }

                `;


                container.appendChild(card);

            });


    } catch (error) {

        console.error(
            "LOAD REPORTS ERROR:",
            error
        );


        if (container) {

            container.innerHTML = `
                <div class="empty error">

                    <h3>
                        Unable to load reports
                    </h3>

                    <p>
                        Please check that the backend
                        server is running.
                    </p>

                </div>
            `;

        }

    }

}


// ==================== START ====================

loadReports();