console.log("protected.js geladen");

fetch("/api/protected.php", {
  credentials: "include" // ← GANZ WICHTIG für Session-Cookie
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Antwort von protected.php:", data);

    if (data.status === "error") {
      // Nicht eingeloggt → Weiterleitung zur Login-Seite
      window.location.href = "/login.html";
    } else {
      // Eingeloggt → Username anzeigen, wenn Element vorhanden
      const welcome = document.getElementById("welcome-message");
      if (welcome) {
        welcome.textContent = "Willkommen " + data.username;
      }

      const begruessung = document.getElementById("begrüssungstitel");
      if (begruessung) {
        begruessung.textContent = `BAINVEGNI ${data.username.toUpperCase()}`;
      }

      const username = document.getElementById("username");
      if (username) {
        username.textContent = data.username;
      }

      // Username optional speichern
      localStorage.setItem("username", data.username);
    }
  })
  .catch((error) => {
    console.error("Fehler beim Login-Check:", error);
    window.location.href = "/login.html"; // Sicherheits-Redirect
  });
