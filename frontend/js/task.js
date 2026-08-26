// const API =
//     "http://localhost:5000/api/tasks";

// const token =
//     localStorage.getItem("token");


// // GET TASK ID FROM URL

// const params =
//     new URLSearchParams(
//         window.location.search
//     );

// const taskId =
//     params.get("id");


// // CHECK LOGIN AND TASK ID

// if (!token || !taskId) {

//     window.location.href =
//         "login.html";

// }


// // ELEMENTS

// const taskContainer =
//     document.getElementById(
//         "taskContainer"
//     );

// const form =
//     document.getElementById(
//         "completeForm"
//     );

// const message =
//     document.getElementById(
//         "message"
//     );


// // LOAD TASK

// async function loadTask() {

//     try {

//         const response =
//             await fetch(
//                 `${API}/${taskId}`,
//                 {
//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`,
//                     },
//                 }
//             );


//         const task =
//             await response.json();


//         if (!response.ok) {

//             throw new Error(
//                 task.message ||
//                 "Failed to load task"
//             );

//         }


//         const report =
//             task.report;


//         taskContainer.innerHTML = `

//             <div class="task-card">

//                 <h2>
//                     ${report.problem}
//                 </h2>

//                 <p>
//                     <strong>
//                         Location:
//                     </strong>

//                     ${report.location}
//                 </p>

//                 <p>
//                     <strong>
//                         Category:
//                     </strong>

//                     ${report.category}
//                 </p>

//                 <p>
//                     <strong>
//                         Priority:
//                     </strong>

//                     ${report.priority}
//                 </p>

//                 <p>
//                     <strong>
//                         Department:
//                     </strong>

//                     ${report.department}
//                 </p>

//                 <p>
//                     <strong>
//                         Current Status:
//                     </strong>

//                     ${task.status}
//                 </p>

//             </div>

//         `;


//         // PREVENT DOUBLE COMPLETION

//         if (
//             task.status === "Completed" ||
//             task.status === "Resolved"
//         ) {

//             form.innerHTML = `

//                 <h2>
//                     Task Already Completed
//                 </h2>

//                 <p>
//                     This task has already been
//                     submitted for verification.
//                 </p>

//             `;

//         }


//     } catch (error) {

//         console.error(error);

//         taskContainer.innerHTML = `

//             <p>
//                 Failed to load task.
//             </p>

//         `;

//     }

// }


// // SUBMIT COMPLETION

// form.addEventListener(
//     "submit",
//     async (e) => {

//         e.preventDefault();


//         message.textContent =
//             "Submitting completion...";


//         const completionMessage =
//             document.getElementById(
//                 "completionMessage"
//             ).value;


//         const afterImage =
//             document.getElementById(
//                 "afterImage"
//             ).files[0];


//         // CHECK AFTER IMAGE

//         if (!afterImage) {

//             message.textContent =
//                 "Please upload an AFTER image.";

//             return;

//         }


//         // CREATE FORM DATA

//         const formData =
//             new FormData();


//         formData.append(
//             "completionMessage",
//             completionMessage
//         );


//         formData.append(
//             "afterImage",
//             afterImage
//         );


//         try {

//             const response =
//                 await fetch(
//                     `${API}/${taskId}/complete`,
//                     {

//                         method: "PUT",

//                         headers: {

//                             Authorization:
//                                 `Bearer ${token}`,

//                         },

//                         body: formData,

//                     }
//                 );


//             const data =
//                 await response.json();


//             if (!response.ok) {

//                 throw new Error(
//                     data.message ||
//                     "Failed to complete task"
//                 );

//             }


//             message.textContent =
//                 "Task completed successfully!";


//             // GO BACK TO TASK DETAILS

//             setTimeout(() => {

//                 window.location.href =
//                     `task.html?id=${taskId}`;

//             }, 1000);


//         } catch (error) {

//             console.error(error);

//             message.textContent =
//                 error.message;

//         }

//     }
// );


// // START

// loadTask();

const API = "http://localhost:5000/api/tasks";

const token = localStorage.getItem("token");

const params =
    new URLSearchParams(window.location.search);

const taskId = params.get("id");


if (!token || !taskId) {
    window.location.href = "login.html";
}


const form =
    document.getElementById("completeForm");


form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const completionMessage =
        document.getElementById(
            "completionMessage"
        ).value;

    const afterImage =
        document.getElementById(
            "afterImage"
        ).files[0];


    const formData = new FormData();

    formData.append(
        "completionMessage",
        completionMessage
    );

    formData.append(
        "afterImage",
        afterImage
    );


    try {

        const response = await fetch(
            `${API}/${taskId}/complete`,
            {
                method: "PUT",

                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },

                body: formData,
            }
        );


        const data = await response.json();


        document.getElementById(
            "message"
        ).textContent = data.message;


        const data = await response.json();

        const message =
            document.getElementById("message");
        
        
        if (response.ok) {
        
            message.innerHTML = `
        
                <div class="ai-result">
        
                    <h2>🤖 AI Verification</h2>
        
                    <h3>
                        ${data.verification.result}
                    </h3>
        
                    <p>
                        ${data.verification.reason}
                    </p>
        
                </div>
        
            `;
        
        } else {
        
            message.textContent =
                data.message;
        
        }
    } catch (error) {

        console.error(error);

        document.getElementById(
            "message"
        ).textContent =
            "Server connection failed";

    }

});