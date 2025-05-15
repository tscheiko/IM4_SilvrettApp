console.log("Hello from index.js");

// Username aus localStorage holen
const savedUsername = localStorage.getItem("username");

// Wenn vorhanden → Text auf der Seite ersetzen
if (savedUsername) {
  const usernameElements = document.querySelectorAll("#username");
  usernameElements.forEach((el) => {
    el.textContent = savedUsername.toUpperCase();
  });
}

console.log("Gespeicherter Benutzer:", savedUsername);
