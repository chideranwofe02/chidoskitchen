// login.js
// ================================
// Secure Login Script (matches register.js)
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const errMessage = document.getElementById("errMessage");
  const submitBtn = form.querySelector("button[type='submit']");

  // Create message element for feedback
  const messageBox = document.createElement("p");
  messageBox.style.textAlign = "center";
  messageBox.style.fontSize = "0.9em";
  messageBox.style.marginTop = "10px";
  if (errMessage) errMessage.appendChild(messageBox);
  else document.body.prepend(messageBox);

  // ================================
  // Helpers
  // ================================

  // Sanitize input to avoid XSS/injection
  const sanitizeInput = (str = "") =>
    String(str).replace(/[<>"'`;(){}]/g, "").trim();

  // Validate email format
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate password length (≥8)
  const validatePassword = (password) => {
    if (!password || password.trim() === "") return false;
    return password.length >= 8;
  };

  // Display message helper
  const showMessage = (msg, type = "error") => {
    messageBox.textContent = msg;
    messageBox.style.color = type === "success" ? "green" : "#d62828";
  };

  // Cookie setter (same as register.js)
  const setCookie = (user, token) => {
    console.log("login cookie", user);
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000); // 1 day
    let expires = "expires=" + d.toUTCString();
    document.cookie = `user=${user}; ${expires}; path=/`;
    document.cookie = `token=${token}; ${expires}; path=/`;
  };

  // ================================
  // Submit handler
  // ================================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get and sanitize input
    const email = sanitizeInput(form.email.value);
    const password = form.password.value; // don't sanitize password

    // Basic validation
    if (!email || !password) {
      return showMessage("⚠️ Please fill in both email and password.");
    }

    if (!validateEmail(email)) {
      return showMessage("⚠️ Invalid email format.");
    }

    if (!validatePassword(password)) {
      return showMessage("⚠️ Password must be at least 8 characters long.");
    }

    // Disable submit during request
    submitBtn.disabled = true;
    submitBtn.textContent = "Logging in...";

    const payload = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("login data:", data);

      if (response.ok) {
        showMessage("🎉 Login successful! Redirecting...", "success");

        // Store token and user info
        if (data.user && data.token) {
          console.log("Setting cookie for user:", data.user._id);
          setCookie(data.user._id, data.token);
        }

        form.reset();

        // Redirect after success
        setTimeout(() => (window.location.href = "dashboard.html"), 1500);
      } else {
        showMessage(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      showMessage("Network error. Please check your connection.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    }
  });
});
