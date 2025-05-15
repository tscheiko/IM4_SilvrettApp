document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
  
    if (savedUsername) {
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.textContent = savedUsername.toUpperCase();
      }
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.textContent = savedUsername.toUpperCase();
      }
    }
  
    // Reservation absenden
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
        } catch (err) {
          console.error("Fehler beim Reservieren:", err);
          responseBox.textContent = "Fehler beim Senden. Bitte später erneut versuchen.";
        }
      });
    }
  });
  