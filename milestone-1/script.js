// TypeScript for toggling Skills Section
document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggle-skills-btn");
    var skillsSection = document.getElementById("skills-section");
    // Hide the skills section by default
    if (skillsSection) {
        skillsSection.style.display = "none";
        toggleButton.textContent = "Show Skills";
    }
    // Add event listener to the button
    toggleButton.addEventListener("click", function () {
        if (skillsSection.style.display === "none") {
            skillsSection.style.display = "block";
            toggleButton.textContent = "Hide Skills";
        }
        else {
            skillsSection.style.display = "none";
            toggleButton.textContent = "Show Skills";
        }
    });
});
