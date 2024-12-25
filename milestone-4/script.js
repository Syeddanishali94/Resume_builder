document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c;
    var form = document.getElementById("resumeForm");
    var educationFields = document.getElementById("educationFields");
    var experienceFields = document.getElementById("experienceFields");
    var skillsList = document.getElementById("skillsList");
    var resumeOutput = document.getElementById("resumeOutput");
    var editResumeButton = document.getElementById("editResume");
    var saveResumeButton = document.getElementById("saveResume");
    var editMessage = document.getElementById("editMessage");
    var replacePhotoInput = document.getElementById("replacePhoto");
    var downloadPdfButton = document.getElementById("downloadResume");
    var shareableLinkContainer = document.getElementById("shareable-link-container");
    var shareableLinkElement = document.getElementById("shareable-link");
    var isEditing = false;
    var generateUsername = function (name) {
        return name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    };
    // Add Education Entry
    (_a = document.getElementById("addEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a;
        var newField = document.createElement("div");
        newField.classList.add("education-entry");
        newField.innerHTML = "\n            <input type=\"text\" name=\"degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" name=\"school\" placeholder=\"School\" required>\n            <input type=\"number\" name=\"graduationYear\" placeholder=\"Graduation Year\" required>\n            <button type=\"button\" class=\"removeEducation\">Remove</button>\n        ";
        educationFields.appendChild(newField);
        (_a = newField.querySelector(".removeEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            newField.remove();
        });
    });
    // Add Work Experience Entry
    (_b = document.getElementById("addExperience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        var _a;
        var newField = document.createElement("div");
        newField.classList.add("experience-entry");
        newField.innerHTML = "\n            <input type=\"text\" name=\"jobTitle\" placeholder=\"Job Title\">\n            <input type=\"text\" name=\"company\" placeholder=\"Company\">\n            <input type=\"number\" name=\"startYear\" placeholder=\"Start Year\">\n            <input type=\"number\" name=\"endYear\" placeholder=\"End Year\">\n            <textarea name=\"jobDescription\" placeholder=\"Job Description\"></textarea>\n            <button type=\"button\" class=\"removeExperience\">Remove</button>\n        ";
        experienceFields.appendChild(newField);
        (_a = newField.querySelector(".removeExperience")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            newField.remove();
        });
    });
    // Add Skill
    (_c = document.getElementById("addSkill")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        var skillInput = document.getElementById("skillInput");
        var skillValue = skillInput.value.trim();
        if (skillValue) {
            var skillItem = document.createElement("li");
            skillItem.textContent = skillValue;
            skillsList.appendChild(skillItem);
            skillInput.value = "";
        }
    });
    // Generate Resume on Form Submit
    form.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault();
        resumeOutput.innerHTML = "";
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var profilePicture = (_a = document.getElementById("profilePicture").files) === null || _a === void 0 ? void 0 : _a[0];
        var username = generateUsername(name);
        // Personal Information Section
        var personalInfoSection = document.createElement("div");
        personalInfoSection.classList.add("section");
        if (profilePicture) {
            var imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(profilePicture);
            personalInfoSection.appendChild(imgElement);
        }
        personalInfoSection.innerHTML += "\n            <h1>".concat(name, "</h1>\n            <h3>Contact</h3>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone || "Not provided", "</p>\n        ");
        resumeOutput.appendChild(personalInfoSection);
        // Education Section
        var educationSection = document.createElement("div");
        educationSection.classList.add("section");
        educationSection.innerHTML = "<h3>Education</h3>";
        var educationList = document.createElement("ul");
        document.querySelectorAll(".education-entry").forEach(function (entry) {
            var degree = entry.querySelector('input[name="degree"]').value;
            var school = entry.querySelector('input[name="school"]').value;
            var graduationYear = entry.querySelector('input[name="graduationYear"]').value;
            var listItem = document.createElement("li");
            listItem.innerHTML = "<strong>".concat(degree, "</strong> from ").concat(school, ", Year: (").concat(graduationYear, ")");
            educationList.appendChild(listItem);
        });
        educationSection.appendChild(educationList);
        resumeOutput.appendChild(educationSection);
        // Work Experience Section
        var experienceSection = document.createElement("div");
        experienceSection.classList.add("section");
        experienceSection.innerHTML = "<h3>Work Experience</h3>";
        var experienceList = document.createElement("ul");
        document.querySelectorAll(".experience-entry").forEach(function (entry) {
            var jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            var company = entry.querySelector('input[name="company"]').value;
            var startYear = entry.querySelector('input[name="startYear"]').value;
            var endYear = entry.querySelector('input[name="endYear"]').value;
            var jobDescription = entry.querySelector('textarea[name="jobDescription"]').value;
            if (jobTitle || company) {
                var listItem = document.createElement("li");
                listItem.innerHTML = "<strong>".concat(jobTitle, "</strong> at ").concat(company, " (").concat(startYear, " - ").concat(endYear || "Present", ")<br>").concat(jobDescription || "");
                experienceList.appendChild(listItem);
            }
        });
        if (experienceList.children.length > 0) {
            experienceSection.appendChild(experienceList);
            resumeOutput.appendChild(experienceSection);
        }
        // Skills Section
        if (skillsList.children.length > 0) {
            var skillsSection = document.createElement("div");
            skillsSection.classList.add("section");
            skillsSection.innerHTML = "<h3>Skills</h3>";
            var ulElement_1 = document.createElement("ul");
            Array.from(skillsList.children).forEach(function (skill) {
                var liElement = document.createElement("li");
                liElement.textContent = skill.textContent || "";
                ulElement_1.appendChild(liElement);
            });
            skillsSection.appendChild(ulElement_1);
            resumeOutput.appendChild(skillsSection);
        }
        // Store resume HTML in localStorage
        var resumeHTML = resumeOutput.innerHTML;
        localStorage.setItem("resume-".concat(username), resumeHTML);
        // Generate shareable URL
        var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?resume=").concat(encodeURIComponent(username));
        shareableLinkContainer.style.display = "block";
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = "Share";
    });
    // Toggle Edit Mode
    editResumeButton === null || editResumeButton === void 0 ? void 0 : editResumeButton.addEventListener("click", function () {
        isEditing = true;
        editMessage.style.display = "block";
        resumeOutput.setAttribute("contenteditable", "true");
        editResumeButton.classList.add("hidden");
        saveResumeButton.classList.remove("hidden");
    });
    saveResumeButton === null || saveResumeButton === void 0 ? void 0 : saveResumeButton.addEventListener("click", function () {
        isEditing = false;
        editMessage.style.display = "none";
        resumeOutput.setAttribute("contenteditable", "false");
        editResumeButton.classList.remove("hidden");
        saveResumeButton.classList.add("hidden");
    });
    // Download Resume as PDF
    downloadPdfButton.addEventListener("click", function () {
        window.print();
    });
    // Handle loading a resume from the shareable link
    var urlParams = new URLSearchParams(window.location.search);
    var resumeUsername = urlParams.get("resume");
    if (resumeUsername) {
        var savedResume = localStorage.getItem("resume-".concat(resumeUsername));
        if (savedResume) {
            resumeOutput.innerHTML = savedResume;
            form.style.display = "none";
        }
    }
    // Replace Profile Photo in Edit Mode
    replacePhotoInput.addEventListener("change", function () {
        var _a;
        var file = (_a = replacePhotoInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var imgElement = resumeOutput.querySelector("img");
            if (imgElement) {
                imgElement.src = URL.createObjectURL(file);
            }
        }
    });
});
