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


// // ==================== FORM ====================

// const reportForm =
//     document.getElementById("reportForm");

// const message =
//     document.getElementById("message");


// if (reportForm) {

//     reportForm.addEventListener("submit", async (e) => {

//         e.preventDefault();


//         const problem =
//             document.getElementById("problem").value;

//         const location =
//             document.getElementById("location").value;

//         const image =
//             document.getElementById("image").files[0];


//         // ==================== FORM DATA ====================

//         const formData =
//             new FormData();


//         formData.append(
//             "problem",
//             problem
//         );


//         formData.append(
//             "location",
//             location
//         );


//         if (image) {

//             formData.append(
//                 "image",
//                 image
//             );
//         }


//         try {

//             message.textContent =
//                 "🤖 AI is analyzing your report...";


//             // ==================== SEND REPORT ====================

//             const response =
//                 await fetch(API, {

//                     method: "POST",

//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     },

//                     body: formData
//                 });


//             const data =
//                 await response.json();


//             console.log(
//                 "Backend response:",
//                 data
//             );


//             // ==================== ERROR ====================

//             if (!response.ok) {

//                 message.textContent =
//                     data.message ||
//                     "Report submission failed";

//                 message.className =
//                     "error";

//                 return;
//             }


//             // ==================== AI RESULT ====================

//             if (data.ai) {

//                 message.className = "";

//                 message.innerHTML = `

//                     <div class="ai-result">

//                         <h3>
//                             🤖 AI Analysis Complete
//                         </h3>

//                         <p>
//                             <strong>Category:</strong>
//                             ${data.ai.category}
//                         </p>

//                         <p>
//                             <strong>Priority:</strong>
//                             ${data.ai.priority}
//                         </p>

//                         <p>
//                             <strong>Department:</strong>
//                             ${data.ai.department}
//                         </p>

//                         <p>
//                             <strong>Similar Reports:</strong>
//                             ${data.ai.similarReports}
//                         </p>

//                         <p>
//                             <strong>AI Reason:</strong>
//                             ${data.ai.reason}
//                         </p>

//                     </div>

//                 `;

//             } else {

//                 message.textContent =
//                     data.message ||
//                     "Report submitted successfully";
//             }


//             reportForm.reset();


//             // ==================== DASHBOARD ====================

//             setTimeout(() => {

//                 window.location.href =
//                     "dashboard.html";

//             }, 3000);


//         } catch (error) {

//             console.error(
//                 "REPORT ERROR:",
//                 error
//             );

//             message.textContent =
//                 "Server connection failed";

//             message.className =
//                 "error";
//         }

//     });

// }


// const API = "http://localhost:5000/api/reports";

// const token = localStorage.getItem("token");
// const userData = localStorage.getItem("user");

// // ==================== CHECK LOGIN ====================
// if (!token || !userData) {
//     window.location.href = "login.html";
// }

// // ==================== FORM ====================
// const reportForm = document.getElementById("reportForm");
// const message = document.getElementById("message");

// if (reportForm) {
//     reportForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const problem =
//             document.getElementById("problem").value;

//         const location =
//             document.getElementById("location").value;

//         const image =
//             document.getElementById("image").files[0];

//         // ==================== FORM DATA ====================
//         const formData = new FormData();

//         formData.append("problem", problem);
//         formData.append("location", location);

//         if (image) {
//             formData.append("image", image);
//         }

//         message.textContent =
//             "🤖 AI is analyzing your report...";

//         try {
//             // ==================== SEND REPORT ====================
//             const response = await fetch(API, {
//                 method: "POST",

//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },

//                 body: formData
//             });

//             const data = await response.json();

//             console.log("Backend response:", data);

//             // ==================== ERROR ====================
//             if (!response.ok) {
//                 message.textContent =
//                     data.message ||
//                     "Report submission failed";

//                 message.className = "error";

//                 return;
//             }

//             // ==================== AI RESULT ====================
//             if (data.ai) {
//                 message.className = "";

//                 message.innerHTML = `
//                     <div class="ai-result">

//                         <h3>
//                             🤖 AI Analysis Complete
//                         </h3>

//                         <p>
//                             <strong>Category:</strong>
//                             ${data.ai.category || "N/A"}
//                         </p>

//                         <p>
//                             <strong>Priority:</strong>
//                             ${data.ai.priority || "N/A"}
//                         </p>

//                         <p>
//                             <strong>Department:</strong>
//                             ${data.ai.department || "N/A"}
//                         </p>

//                         <p>
//                             <strong>Similar Reports:</strong>
//                             ${data.ai.similarReports || 0}
//                         </p>

//                         <p>
//                             <strong>AI Reason:</strong>
//                             ${data.ai.reason || "N/A"}
//                         </p>

//                     </div>
//                 `;
//             } else {
//                 message.textContent =
//                     data.message ||
//                     "Report submitted successfully";
//             }

//             reportForm.reset();

//             // ==================== DASHBOARD ====================
//             setTimeout(() => {
//                 window.location.href = "dashboard.html";
//             }, 3000);

//         } catch (error) {
//             console.error("REPORT ERROR:", error);

//             message.textContent =
//                 "Server connection failed";

//             message.className = "error";
//         }
//     });
// }


// *******82ND STAGE
// const API = "http://localhost:5000/api/reports";

// const token = localStorage.getItem("token");
// const userData = localStorage.getItem("user");

// // ==================== CHECK LOGIN ====================

// if (!token || !userData) {


// window.location.href = "login.html";

// throw new Error("User not logged in");


// }

// const user = JSON.parse(userData);

// // ==================== GET USER ID ====================

// const userId = user._id || user.id;

// if (!userId) {


// console.error("USER DATA:", user);

// alert("User ID not found. Please login again.");

// localStorage.removeItem("token");
// localStorage.removeItem("user");

// window.location.href = "login.html";

// throw new Error("User ID not found");


// }

// // ==================== FORM ====================

// const reportForm =
// document.getElementById("reportForm");

// const message =
// document.getElementById("message");

// if (reportForm) {


// reportForm.addEventListener("submit", async (e) => {

//     e.preventDefault();


//     // ==================== GET FORM VALUES ====================

//     const problem =
//         document
//             .getElementById("problem")
//             .value
//             .trim();

//     const location =
//         document
//             .getElementById("location")
//             .value
//             .trim();

//     const image =
//         document
//             .getElementById("image")
//             .files[0];


//     // ==================== VALIDATION ====================

//     if (!problem || !location) {

//         message.textContent =
//             "Please enter problem and location.";

//         message.className = "error";

//         return;

//     }


//     // ==================== FORM DATA ====================

//     const formData = new FormData();

//     formData.append("userId", userId);

//     formData.append("problem", problem);

//     formData.append("location", location);


//     if (image) {

//         formData.append("image", image);

//     }


//     // ==================== DEBUG ====================

//     console.log("Sending report...");
//     console.log("User ID:", userId);
//     console.log("Problem:", problem);
//     console.log("Location:", location);
//     console.log("Image:", image);


//     // ==================== AI MESSAGE ====================

//     message.textContent =
//         "AI is analyzing your report...";

//     message.className = "";


//     try {

//         // ==================== SEND REPORT ====================

//         const response = await fetch(API, {

//             method: "POST",

//             headers: {

//                 Authorization: "Bearer " + token

//             },

//             body: formData

//         });


//         const data =
//             await response.json();


//         console.log(
//             "Backend response:",
//             data
//         );


//         // ==================== ERROR ====================

//         if (!response.ok) {

//             message.textContent =
//                 data.message ||
//                 "Report submission failed";

//             message.className =
//                 "error";

//             return;

//         }


//         // ==================== AI RESULT ====================

//         if (data.ai) {

//             message.className = "";

//             message.innerHTML =

//                 '<div class="ai-result">' +

//                 '<h3>🤖 AI Analysis Complete</h3>' +

//                 '<p>' +
//                 '<strong>Category:</strong> ' +
//                 (data.ai.category || "N/A") +
//                 '</p>' +

//                 '<p>' +
//                 '<strong>Priority:</strong> ' +
//                 (data.ai.priority || "N/A") +
//                 '</p>' +

//                 '<p>' +
//                 '<strong>Department:</strong> ' +
//                 (data.ai.department || "N/A") +
//                 '</p>' +

//                 '<p>' +
//                 '<strong>Similar Reports:</strong> ' +
//                 (data.ai.similarReports || 0) +
//                 '</p>' +

//                 '<p>' +
//                 '<strong>AI Reason:</strong> ' +
//                 (data.ai.reason || "N/A") +
//                 '</p>' +

//                 '</div>';

//         } else {

//             message.textContent =
//                 data.message ||
//                 "Report submitted successfully";

//         }


//         // ==================== RESET FORM ====================

//         reportForm.reset();


//         // ==================== GO DASHBOARD ====================

//         setTimeout(() => {

//             window.location.href =
//                 "dashboard.html";

//         }, 5000);


//     } catch (error) {

//         console.error(
//             "REPORT ERROR:",
//             error
//         );

//         message.textContent =
//             "Server connection failed";

//         message.className =
//             "error";

//     }

// });


// }


// ***83RD STAGE
const API = "http://localhost:5000/api/reports";

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

// ==================== CHECK LOGIN ====================

if (!token || !userData) {
    window.location.href = "login.html";
    throw new Error("User not logged in");
}

const user = JSON.parse(userData);

// ==================== GET USER ID ====================

const userId = user._id || user.id;

if (!userId) {
    console.error("USER DATA:", user);

    alert("User ID not found. Please login again.");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

    throw new Error("User ID not found");
}

// ==================== FORM ELEMENTS ====================

const reportForm = document.getElementById("reportForm");
const message = document.getElementById("message");


// ==================== FORM SUBMIT ====================

if (reportForm) {

    reportForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        // ==================== GET VALUES ====================

        const problem = document
            .getElementById("problem")
            .value
            .trim();

        const location = document
            .getElementById("location")
            .value
            .trim();

        const image = document
            .getElementById("image")
            .files[0];


        // ==================== VALIDATION ====================

        if (!problem || !location) {

            message.textContent =
                "Please enter problem and location.";

            message.className = "error";

            return;
        }


        // ==================== FORM DATA ====================

        const formData = new FormData();

        formData.append("userId", userId);
        formData.append("problem", problem);
        formData.append("location", location);

        if (image) {
            formData.append("image", image);
        }


        // ==================== DEBUG ====================

        console.log("Sending report...");
        console.log("User ID:", userId);
        console.log("Problem:", problem);
        console.log("Location:", location);
        console.log("Image:", image);


        // ==================== AI LOADING ====================

        message.className = "loading";

        message.innerHTML = `
            <div class="ai-loading">
                <div class="loader"></div>

                <div>
                    <strong>AI is analyzing your report...</strong>
                    <p>
                        Classifying complaint, checking priority
                        and generating resolution recommendation.
                    </p>
                </div>
            </div>
        `;

        // Disable button while processing

        const submitButton =
            reportForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Analyzing...";
        }


        // ==================== SEND TO BACKEND ====================

        try {

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    Authorization: "Bearer " + token
                },

                body: formData
            });


            const data = await response.json();

            console.log("Backend response:", data);


            // ==================== ERROR ====================

            if (!response.ok) {

                message.className = "error";

                message.innerHTML = `
                    <div class="error-box">
                        <strong>Report submission failed</strong>
                        <p>
                            ${data.message || "Something went wrong."}
                        </p>
                    </div>
                `;

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit Report";
                }

                return;
            }


            // ==================== AI RESULT ====================

            if (data.ai) {

                message.className = "success";

                message.innerHTML = `

                    <div class="ai-result">

                        <div class="ai-header">

                            <div>
                                <span class="ai-badge">
                                    AI ANALYSIS
                                </span>

                                <h2>
                                    Complaint Analyzed
                                </h2>

                                <p>
                                    Your complaint has been
                                    automatically analyzed and routed
                                    to the appropriate department.
                                </p>
                            </div>

                            <div class="ai-icon">
                                🤖
                            </div>

                        </div>


                        <!-- AI SUMMARY -->

                        <div class="analysis-section">

                            <h3>📋 Complaint Summary</h3>

                            <p>
                                ${data.ai.summary || "No summary available."}
                            </p>

                        </div>


                        <!-- ANALYSIS GRID -->

                        <div class="analysis-grid">

                            <div class="analysis-item">

                                <span class="label">
                                    Category
                                </span>

                                <strong>
                                    ${data.ai.category || "N/A"}
                                </strong>

                            </div>


                            <div class="analysis-item">

                                <span class="label">
                                    Severity
                                </span>

                                <strong class="severity-${(
                                    data.ai.severity || "Medium"
                                ).toLowerCase()}">

                                    ${data.ai.severity || "N/A"}

                                </strong>

                            </div>


                            <div class="analysis-item">

                                <span class="label">
                                    Priority
                                </span>

                                <strong class="priority-${(
                                    data.ai.priority || "Medium"
                                ).toLowerCase()}">

                                    ${data.ai.priority || "N/A"}

                                </strong>

                            </div>


                            <div class="analysis-item">

                                <span class="label">
                                    Department
                                </span>

                                <strong>
                                    ${data.ai.department || "N/A"}
                                </strong>

                            </div>

                        </div>


                        <!-- RELATED COMPLAINTS -->

                        <div class="related-box">

                            <span>
                                🔁 Related complaints
                            </span>

                            <strong>
                                ${data.ai.relatedComplaintCount || 1}
                            </strong>

                            <small>
                                complaint(s) detected at this location
                            </small>

                        </div>


                        <!-- RECOMMENDATION -->

                        <div class="recommendation-box">

                            <h3>
                                🛠 AI Resolution Recommendation
                            </h3>

                            <p>
                                ${
                                    data.ai.recommendation ||
                                    "No recommendation available."
                                }
                            </p>

                        </div>


                        <!-- AI REASON -->

                        <div class="reason-box">

                            <h3>
                                💡 Why AI classified it this way
                            </h3>

                            <p>
                                ${
                                    data.ai.reason ||
                                    "No explanation available."
                                }
                            </p>

                        </div>


                        <!-- SUCCESS -->

                        <div class="success-message">

                            <span>✓</span>

                            <div>
                                <strong>
                                    Report successfully submitted
                                </strong>

                                <p>
                                    The complaint has been assigned
                                    to the ${data.ai.department || "responsible"}
                                    department.
                                </p>
                            </div>

                        </div>

                    </div>
                `;

            } else {

                message.className = "success";

                message.textContent =
                    data.message ||
                    "Report submitted successfully.";
            }


            // ==================== RESET FORM ====================

            reportForm.reset();


            // ==================== REDIRECT ====================

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 7000);


        } catch (error) {

            console.error(
                "REPORT ERROR:",
                error
            );

            message.className = "error";

            message.innerHTML = `
                <div class="error-box">

                    <strong>
                        Server connection failed
                    </strong>

                    <p>
                        Please make sure the backend
                        server is running.
                    </p>

                </div>
            `;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Report";
            }
        }

    });

}