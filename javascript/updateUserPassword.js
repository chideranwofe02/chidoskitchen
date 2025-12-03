const updatePassword = async () => {
  const user = getCookie("user");
  const token = getCookie("token"); 
    const old_password = document.getElementById("old_password").value;   
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const messageBox = document.getElementById("password_error_message_box");

    // Input validation
if (!old_password || !newPassword || !confirmPassword) {
        messageBox.className = "alert alert-danger mt-3";   
        messageBox.innerText = "⚠️ All fields are required.";
        return;
    }



    if (old_password === newPassword) {  
        messageBox.className = "alert alert-danger mt-3";   
        messageBox.innerText = "⚠️ New password must be different from current password.";
        return;
    }

 

    if (newPassword !== confirmPassword) {  
        messageBox.className = "alert alert-danger mt-3";   
        messageBox.innerText = "⚠️ Please confirm password, 'confirm password' must match 'new password.'";
        return;
    }   
    if (newPassword.length < 8) {
        messageBox.className = "alert alert-danger mt-3";   
        messageBox.innerText = "⚠️ New password must be at least 8 characters long.";
        return;
    }
    document.querySelector("#update_password").innerHTML="Updating..."
    try {
        // API call
        const response = await fetch("http://localhost:5000/api/auth/password/update", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({          
                token,
                user,
                old_password:old_password,
                new_password:newPassword,
            }),
        });
        const result = await response.json();
        console.log(result);    
        if (response.ok) {

            messageBox.className = "alert alert-success mt-3";

            messageBox.innerText = "✅ Password updated successfully!";
            document.querySelector("#update_password").innerHTML="Successfully Updated"
        }
        else {
            document.querySelector("#update_password").innerHTML="Try Again"
            throw new Error(result.errMessage || "Failed to update password.");
        }   

    } catch (error) {
        messageBox.className = "alert alert-danger mt-3";
        messageBox.innerText = `❌ ${error.message}`;
        document.querySelector("#update_password").innerHTML="Try Again"
    }
};

document.querySelectorAll("input[type=password]").forEach((input) => {
  input.oninput = () => {
    document.getElementById("password_error_message_box").className = "";       
    document.getElementById("password_error_message_box").innerText = "";
    document.querySelector("#update_password").innerHTML="Update Password"
  }
});

document.querySelector("#update_password").onclick = (e) => {
  e.preventDefault();
  updatePassword();
};

const eraseCookie = (name) => {
  document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   document.cookie = "is_active=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   window.location.href = "/login.html";
    // Optional confirmation
    alert("You have been logged out successfully.");

    // Redirect to landing page (change the file name if different)
    window.location.href = "index.html";

}   


document.querySelector("#logout").onclick = (e) => {
  e.preventDefault();
  eraseCookie("user");
  eraseCookie("token");
  window.location.href = "login.html";
}