// TypeScript for toggling Skills Section

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-skills-btn") as HTMLButtonElement;
    const skillsSection = document.getElementById("skills-section") as HTMLElement;
  
    // Hide the skills section by default
    if (skillsSection) {
      skillsSection.style.display = "none";
      toggleButton.textContent = "Show Skills";
    }
  
    // Add event listener to the button
    toggleButton.addEventListener("click", () => {
      if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
        toggleButton.textContent = "Hide Skills";
      } else {
        skillsSection.style.display = "none";
        toggleButton.textContent = "Show Skills";
      }
    });
  });
  