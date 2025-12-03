





// register.js
// ================================
// Secure Register Script (fixed)
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const errMessage = document.getElementById("errMessage");
  const submitBtn = form.querySelector("button[type='submit']");

  // Create message element for feedback (attach to errMessage if exists)
  const messageBox = document.createElement("p");
  messageBox.style.textAlign = "center";
  messageBox.style.fontSize = "0.9em";
  messageBox.style.marginTop = "10px";
  if (errMessage) errMessage.appendChild(messageBox);
  else document.body.prepend(messageBox);

  // Sanitize input to avoid XSS/injection
  const sanitizeInput = (str = "") => String(str).replace(/[<>"'`;(){}]/g, "").trim();

  // Email format validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation: only test if user typed something,
  // then require at least 8 characters.
  const validatePassword = (password) => {
    if (!password || password.trim() === "") {
      // If nothing typed, return false (the form will catch required fields)
      return false;
    }
    return password.length >= 8;
  };

  // Phone validation (only numbers and length 8-15)
  const validatePhone = (phone) => /^\d{8,15}$/.test(phone);

  // Display message helper
  const showMessage = (msg, type = "error") => {
    messageBox.textContent = msg;
    messageBox.style.color = type === "success" ? "green" : "#d62828";
  };



  const setCookie=(user, token)=>{
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search);
  // for (const param of params) {
  //   navigate = param[0];
  // }
  // if (navigate) return window.location.replace(navigate);
  // window.location.replace("/dashboard.html");
}


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values and sanitize where appropriate
    const fullname = sanitizeInput(form.fullname.value);
    const email = sanitizeInput(form.email.value);
    const phone = sanitizeInput(form.phone.value);
    const password = form.password.value; // don't sanitize password (we want exact)
    const confirmPassword = form["confirm-password"].value;
    const location = sanitizeInput(form.location.value);
    const referral = sanitizeInput(form.referral.value);

    // =============== Validation ===============
    if (!fullname || !email || !phone || !password || !confirmPassword) {
      return showMessage("⚠️ Please fill in all required fields.");
    }

    if (!validateEmail(email)) {
      return showMessage("⚠️ Invalid email format.");
    }

    if (!validatePhone(phone)) {
      return showMessage("⚠️ Enter a valid phone number (digits only, 8-15 digits).");
    }

    // Password: check only if typed, then ensure length >= 8
    if (!validatePassword(password)) {
      return showMessage("⚠️ Password must be at least 8 characters long.");
    }

    if (password !== confirmPassword) {
      return showMessage("⚠️ Passwords do not match.");
    }

    // Disable submit button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Account...";

    // Prepare secure payload
    const payload = {
      fullName:fullname,
      email,
      phone,
      password,
      location:location||null,
      referral: referral || null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
console.log("data",data);
      if (response.ok) {
        showMessage("🎉 Account created successfully!", "success");
        form.reset();

        // Optional: store JWT or redirect to dashboard
console.log("data.user.id",data.user.id);
        setCookie(data.user.id, data.token);
        // if (data.token) {
        //   localStorage.setItem("authToken", data.token);
        // }

        setTimeout(() => (window.location.href = "dashboard.html"), 1500);
      } else {
        showMessage(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      showMessage("Network error. Please check your connection.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Create Account";
    }
  });
});
