document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
  
    if (savedUsername) {
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.textContent = savedUsername.toUpperCase();
      }
    }
  });