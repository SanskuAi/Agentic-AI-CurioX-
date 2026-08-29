// const API =
//     "http://localhost:5000/api/reports";


// const token =
//     localStorage.getItem("token");

// const userData =
//     localStorage.getItem("user");


// // ==================== CHECK LOGIN ====================

// if (!token || !userData) {

//     window.location.href =
//         "login.html";
// }


// const user =
//     JSON.parse(userData);


// // ==================== CHECK ADMIN ====================

// if (user.role !== "admin") {

//     window.location.href =
//         "dashboard.html";
// }


// // ==================== CONTAINER ====================

// const container =
//     document.getElementById(
//         "reportsContainer"
//     );


// // ==================== LOGOUT ====================

// document
//     .getElementById("logoutBtn")
//     .addEventListener("click", () => {

//         localStorage.removeItem("token");

//         localStorage.removeItem("user");

//         window.location.href =
//             "login.html";
//     });


// // ==================== LOAD REPORTS ====================

// async function loadReports() {

//     try {

//         const response =
//             await fetch(API, {

//                 headers: {

//                     Authorization:
//                         `Bearer ${token}`
//                 }
//             });


//         const reports =
//             await response.json();


//         if (!response.ok) {

//             container.innerHTML = `
//                 <p>
//                     ${reports.message ||
//                     "Failed to load reports."}
//                 </p>
//             `;

//             return;
//         }


//         updateStats(reports);


//         if (!reports.length) {

//             container.innerHTML =
//                 "<p>No reports available.</p>";

//             return;
//         }


//         container.innerHTML = "";


//         reports.forEach((report) => {

//             const card =
//                 document.createElement("div");


//             card.className =
//                 "report-card";


//             card.innerHTML = `

//                 <h3>
//                     ${report.problem}
//                 </h3>

//                 <p>
//                     <strong>Location:</strong>
//                     ${report.location}
//                 </p>

//                 <p>
//                     <strong>Category:</strong>
//                     ${report.category}
//                 </p>

//                 <p>
//                     <strong>Department:</strong>
//                     ${report.department}
//                 </p>

//                 <span class="priority">
//                     Priority:
//                     ${report.priority}
//                 </span>

//                 <span class="status">
//                     ${report.status}
//                 </span>

//             `;


//             container.appendChild(card);

//         });


//     } catch (error) {

//         console.error(error);

//         container.innerHTML =
//             "<p>Failed to load reports.</p>";
//     }
// }


// // ==================== STATS ====================

// function updateStats(reports) {

//     document.getElementById(
//         "total"
//     ).textContent =
//         reports.length;


//     document.getElementById(
//         "assigned"
//     ).textContent =
//         reports.filter(
//             (report) =>
//                 report.status === "Assigned"
//         ).length;


//     document.getElementById(
//         "resolved"
//     ).textContent =
//         reports.filter(
//             (report) =>
//                 report.status === "Likely Resolved"
//         ).length;


//     document.getElementById(
//         "reinspection"
//     ).textContent =
//         reports.filter(
//             (report) =>
//                 report.status === "Needs Reinspection"
//         ).length;
// }


// loadReports();

const API = "http://localhost:5000/api/reports";

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

// ==================== CHECK LOGIN ====================
if (!token || !userData) {
    window.location.href = "login.html";
}

const user = JSON.parse(userData);

// ==================== CHECK ADMIN ====================
if (user.role !== "admin") {
    window.location.href = "dashboard.html";
}

// ==================== CONTAINER ====================
const container =
    document.getElementById("reportsContainer");

// ==================== LOGOUT ====================
const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";
    });
}

// ==================== LOAD REPORTS ====================
async function loadReports() {

    try {

        const response = await fetch(API, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const reports =
            await response.json();

        console.log("Reports:", reports);

        if (!response.ok) {

            container.innerHTML = `
                <p>
                    ${reports.message ||
                    "Failed to load reports."}
                </p>
            `;

            return;
        }

        updateStats(reports);

        if (!reports.length) {

            container.innerHTML =
                "<p>No reports available.</p>";

            return;
        }

        container.innerHTML = "";

        reports.forEach((report) => {

            const card =
                document.createElement("div");

            card.className =
                "report-card";

            card.innerHTML = `
                <h3>
                    ${report.problem}
                </h3>

                <p>
                    <strong>Location:</strong>
                    ${report.location}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${report.category}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${report.department}
                </p>

                <span class="priority">
                    Priority: ${report.priority}
                </span>

                <span class="status">
                    ${report.status}
                </span>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error("LOAD REPORT ERROR:", error);

        container.innerHTML =
            "<p>Failed to load reports.</p>";
    }
}


// ==================== STATS ====================
function updateStats(reports) {

    document.getElementById("total").textContent =
        reports.length;

    document.getElementById("assigned").textContent =
        reports.filter(
            (report) =>
                report.status === "Assigned"
        ).length;

    document.getElementById("resolved").textContent =
        reports.filter(
            (report) =>
                report.status === "Likely Resolved"
        ).length;

    document.getElementById("reinspection").textContent =
        reports.filter(
            (report) =>
                report.status === "Needs Reinspection"
        ).length;
}

loadReports();