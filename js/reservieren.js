document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.textContent = savedUsername.toUpperCase();
      }
    }
  
    const form = document.getElementById("reservationForm");
    const responseBox = document.getElementById("reservationResponse");
  
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const checkin = document.getElementById("checkin").value;
        const checkout = document.getElementById("checkout").value;
        const username = savedUsername || "Gast";
  
        if (!checkin || !checkout) {
          responseBox.textContent = "Bitte beide Daten ausfüllen.";
          responseBox.className = "error-message";
          responseBox.style.display = "block";
          return;
        }
  
        const formData = new FormData();
        formData.append("checkin", checkin);
        formData.append("checkout", checkout);
        formData.append("username", username);
  
        try {
          const res = await fetch("api/reservieren.php", {
            method: "POST",
            body: formData,
          });
  
          const reply = await res.text();
          responseBox.textContent = reply.trim();
          responseBox.style.display = "block";
  
          if (reply.includes("bearbeitet")) {
            responseBox.classList.remove("error-message");
            responseBox.classList.add("success-message");
          } else {
            responseBox.classList.remove("success-message");
            responseBox.classList.add("error-message");
          }
        } catch (err) {
          console.error("Fehler beim Reservieren:", err);
          responseBox.textContent = "Fehler beim Senden. Bitte später erneut versuchen.";
          responseBox.className = "error-message";
          responseBox.style.display = "block";
        }
      });
    }
  });
  