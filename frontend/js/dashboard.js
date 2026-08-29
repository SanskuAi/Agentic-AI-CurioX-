const API = "http://localhost:5000/api/reports";

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


// LOAD REPORTS

async function loadReports() {

    try {

        const response = await fetch(API, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });


        if (!response.ok) {

            throw new Error(
                "Failed to fetch reports"
            );

        }


        const reports = await response.json();


        // ONLY CURRENT USER REPORTS

        const myReports = reports.filter(
            report =>
                report.user &&
                report.user._id === user._id
        );


        // COUNTS

        const total =
            myReports.length;


        const pending =
            myReports.filter(
                report =>
                    report.status !== "Likely Resolved"
            ).length;


        const resolved =
            myReports.filter(
                report =>
                    report.status === "Likely Resolved"
            ).length;


        // UPDATE COUNTS

        document.getElementById(
            "totalReports"
        ).textContent = total;


        document.getElementById(
            "pendingReports"
        ).textContent = pending;


        document.getElementById(
            "resolvedReports"
        ).textContent = resolved;


        // RECENT REPORTS

        const container =
            document.getElementById(
                "recentReports"
            );


        if (!container) {
            return;
        }


        if (myReports.length === 0) {

            container.innerHTML =
                "<p>No reports yet.</p>";

            return;

        }


        container.innerHTML = "";


        myReports
            .slice(0, 5)
            .forEach(report => {

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
                        <strong>Priority:</strong>
                        ${report.priority}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${report.status}
                    </p>

                `;


                container.appendChild(card);

            });


    } catch (error) {

        console.error(error);

    }

}


// START

loadReports();