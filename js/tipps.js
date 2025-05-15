document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
    const username = savedUsername ? savedUsername.toUpperCase() : "DICH";
  
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
      usernameElement.textContent = username;
    }
  });