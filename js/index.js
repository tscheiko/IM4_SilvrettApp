console.log("Hello from index.js");

document.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("username");

  if (savedUsername) {
    const title = document.getElementById("begrüssungstitel");
    if (title) {
      title.textContent = `BAINVEGNI ${savedUsername.toUpperCase()}`;
    }
  }
});


console.log("Gespeicherter Benutzer:", savedUsername);
