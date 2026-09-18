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

    console.error(
        "USER DATA ERROR:",
        error
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}


// ==================== USER NAME ====================

const userName =
    document.getElementById("userName");

if (userName) {

    userName.textContent =
        user.name || "User";

}


// ==================== LOGOUT ====================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href =
                "login.html";

        }
    );

}


// ==================== HTML ESCAPE ====================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
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
        document.getElementById(
            "reportsContainer"
        );

    const reportCount =
        document.getElementById(
            "reportCount"
        );


    try {

        container.innerHTML = `
            <div class="loading">
                Loading your reports...
            </div>
        `;


        // ==================== API REQUEST ====================

        const response = await fetch(
            API,
            {
                method: "GET",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        // ==================== ERROR ====================

        if (!response.ok) {

            container.innerHTML = `
                <div class="message error">
                    ${escapeHTML(
                        data.message ||
                        "Failed to load reports."
                    )}
                </div>
            `;

            return;
        }


        // ==================== REPORTS ====================

        const reports =
            Array.isArray(data)
                ? data
                : [];


        // ==================== CURRENT USER ====================

        const myReports =
            reports.filter(
                (report) => {

                    if (!report.user) {
                        return false;
                    }


                    // Populated user

                    if (
                        typeof report.user ===
                        "object"
                    ) {

                        return (
                            String(
                                report.user._id
                            ) ===
                            String(
                                user._id
                            )
                        );

                    }


                    // ObjectId only

                    return (
                        String(
                            report.user
                        ) ===
                        String(
                            user._id
                        )
                    );

                }
            );


        // ==================== SORT ====================

        myReports.sort(
            (a, b) => {

                const dateA =
                    new Date(
                        a.createdAt || 0
                    );

                const dateB =
                    new Date(
                        b.createdAt || 0
                    );

                return dateB - dateA;

            }
        );


        // ==================== COUNT ====================

        reportCount.textContent =
            myReports.length;


        // ==================== EMPTY ====================

        if (
            myReports.length === 0
        ) {

            container.innerHTML = `
                <div class="empty">

                    <div class="empty-icon">
                        📋
                    </div>

                    <h2>
                        No Reports Yet
                    </h2>

                    <p>
                        You have not submitted
                        any infrastructure complaints.
                    </p>

                    <a
                        href="report.html"
                        class="empty-btn"
                    >
                        Report a Problem
                    </a>

                </div>
            `;

            return;
        }


        // ==================== DISPLAY ====================

        container.innerHTML = "";


        myReports.forEach(
            (report, index) => {

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "report-card";


                // ==================== VALUES ====================

                const status =
                    report.verificationStatus ||
                    report.status ||
                    "Assigned";


                const priority =
                    report.priority ||
                    "Medium";


                const severity =
                    report.severity ||
                    "Medium";


                const category =
                    report.category ||
                    "Other";


                const department =
                    report.department ||
                    "Not assigned";


                const relatedCount =
                    report.relatedComplaintCount ||
                    1;


                // ==================== DATE ====================

                let dateText =
                    "Date unavailable";


                if (report.createdAt) {

                    const date =
                        new Date(
                            report.createdAt
                        );

                    if (
                        !isNaN(
                            date.getTime()
                        )
                    ) {

                        dateText =
                            date.toLocaleString();

                    }

                }


                // ==================== CARD ====================

                card.innerHTML = `

                    <div class="report-header">

                        <div class="title-area">

                            <span class="report-number">
                                Report #${index + 1}
                            </span>

                            <h2>
                                ${escapeHTML(
                                    report.problem
                                )}
                            </h2>

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
                            ${escapeHTML(
                                status
                            )}
                        </span>

                    </div>


                    <!-- ==================== BASIC DETAILS ==================== -->

                    <div class="details-grid">


                        <div class="detail-box">

                            <span>
                                Category
                            </span>

                            <strong>
                                ${escapeHTML(
                                    category
                                )}
                            </strong>

                        </div>


                        <div class="detail-box">

                            <span>
                                Severity
                            </span>

                            <strong>
                                ${escapeHTML(
                                    severity
                                )}
                            </strong>

                        </div>


                        <div class="detail-box">

                            <span>
                                Priority
                            </span>

                            <strong
                                class="${getPriorityClass(
                                    priority
                                )}"
                            >
                                ${escapeHTML(
                                    priority
                                )}
                            </strong>

                        </div>


                        <div class="detail-box">

                            <span>
                                Department
                            </span>

                            <strong>
                                ${escapeHTML(
                                    department
                                )}
                            </strong>

                        </div>


                    </div>


                    <!-- ==================== RELATED REPORTS ==================== -->

                    <div class="related">

                        <span>
                            Related Complaints
                        </span>

                        <strong>
                            ${escapeHTML(
                                relatedCount
                            )}
                        </strong>

                        ${
                            relatedCount > 1
                                ? `
                                    <small>
                                        Similar complaints
                                        detected at this location.
                                    </small>
                                `
                                : `
                                    <small>
                                        No similar complaint
                                        detected.
                                    </small>
                                `
                        }

                    </div>


                    <!-- ==================== AI SUMMARY ==================== -->

                    ${
                        report.aiSummary
                            ? `
                                <div class="ai-section">

                                    <div class="ai-title">
                                        🤖 AI Analysis
                                    </div>

                                    <p>
                                        ${escapeHTML(
                                            report.aiSummary
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                    }


                    <!-- ==================== RECOMMENDATION ==================== -->

                    ${
                        report.resolutionRecommendation
                            ? `
                                <div class="recommendation">

                                    <div class="recommendation-title">
                                        AI Resolution Recommendation
                                    </div>

                                    <p>
                                        ${escapeHTML(
                                            report.resolutionRecommendation
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                    }


                    <!-- ==================== AI REASON ==================== -->

                    ${
                        report.aiReason
                            ? `
                                <div class="reason">

                                    <div class="reason-title">
                                        Why AI Selected This
                                    </div>

                                    <p>
                                        ${escapeHTML(
                                            report.aiReason
                                        )}
                                    </p>

                                </div>
                            `
                            : ""
                    }


                    <!-- ==================== VERIFICATION ==================== -->

                    ${
                        report.verificationStatus
                            ? `
                                <div
                                    class="verification ${getStatusClass(
                                        report.verificationStatus
                                    )}"
                                >

                                    <strong>
                                        AI Verification:
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            report.verificationStatus
                                        )}
                                    </span>

                                    ${
                                        report.verificationReason
                                            ? `
                                                <p>
                                                    ${escapeHTML(
                                                        report.verificationReason
                                                    )}
                                                </p>
                                            `
                                            : ""
                                    }

                                </div>
                            `
                            : ""
                    }


                    <!-- ==================== DATE ==================== -->

                    <div class="report-footer">

                        <span>
                            Submitted:
                            ${escapeHTML(
                                dateText
                            )}
                        </span>

                    </div>

                `;


                container.appendChild(card);

            }
        );


    } catch (error) {

        console.error(
            "LOAD REPORTS ERROR:",
            error
        );


        container.innerHTML = `
            <div class="message error">

                <h3>
                    Unable to load reports
                </h3>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

            </div>
        `;

    }

}


// ==================== START ====================

loadReports();