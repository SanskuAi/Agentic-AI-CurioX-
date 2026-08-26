const API = "http://localhost:5000/api/tasks";

const token = localStorage.getItem("token");

const userData = localStorage.getItem("user");


if (!token || !userData) {

    window.location.href = "login.html";

}


const user = JSON.parse(userData);


document.getElementById("departmentName")
    .textContent = user.name;


const container =
    document.getElementById("tasksContainer");


// LOGOUT

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.href = "login.html";

    });


// LOAD TASKS

async function loadTasks() {

    try {

        const response = await fetch(API, {

            headers: {
                Authorization: `Bearer ${token}`,
            },

        });


        const tasks = await response.json();


        if (tasks.length === 0) {

            container.innerHTML =
                "<p>No tasks assigned.</p>";

            return;

        }


        container.innerHTML = "";


        tasks.forEach((task) => {

            const report = task.report;


            const card =
                document.createElement("div");

            card.className = "task-card";


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

                <span class="priority">
                    ${report.priority}
                </span>

                <span class="status">
                    ${task.status}
                </span>

                <br>

                <a
                    class="view-btn"
                    href="task.html?id=${task._id}"
                >
                    View Task
                </a>

            `;


            container.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        container.innerHTML =
            "<p>Failed to load tasks.</p>";

    }

}


loadTasks();