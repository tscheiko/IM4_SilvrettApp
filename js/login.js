console.log("Hello from login.js");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginInfo = document.querySelector("#username-email").value.trim();
  const password = document.querySelector("#password").value;
  const errorBox = document.getElementById("errorBox");

  if (!loginInfo || !password) {
    errorBox.textContent = "Bitte fülle alle Felder aus";
    errorBox.style.display = "block";
    return;
  }

  const formData = new FormData();
  formData.append("loginInfo", loginInfo);
  formData.append("password", password);

  try {
    const res = await fetch("api/login.php", {
      method: "POST",
      body: formData,
    });

    const reply = await res.text();
    console.log("Antwort vom Server:", JSON.stringify(reply));

    if (reply.trim().startsWith("Login erfolgreich:")) {
      const parts = reply.trim().split(":");
      const username = parts[1] ? parts[1].trim() : "Gast";
    
      localStorage.setItem("username", username);
      window.location.href = "index.html";
    } else {
      errorBox.textContent = reply.trim();
      errorBox.style.display = "block";
    }
    
  } catch (err) {
    console.error("Fehler beim Senden:", err);
    errorBox.textContent = "Fehler beim Verbinden mit dem Server.";
    errorBox.style.display = "block";
  }
});

// Fehleranzeige ausblenden beim Tippen
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    document.getElementById("errorBox").style.display = "none";
  });
});
