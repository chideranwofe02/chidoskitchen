// const updateProfile=async()=>{
//     const user = getCookie("user");
//     const token = getCookie("token");
//     try {
//         const response = await fetch(
//           "http://localhost:5000/api/auth/profile/update",
//           // "http://localhost:5000https://crescentpipsltdbackend-production.up.railway.app/user/find",

//           {
//             method: "POST",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ token, user }),
//           },
//         );
//         const result=await response.json()
//         console.log(result)
//         if(response.ok){
//        appendProfile(result.user)
//         } else{
//             throw new Error(result.errMessage || "Failed to fetch user profile")
//         }
//     } catch (error) {
//         alert(error.message)
//     }
// }



// document.querySelector("#update_profile").onclick=()=>{
  
// const full_name=document.getElementById("full_name").value 
// const email_address=document.getElementById("email_address").value 
// const phone_number=document.getElementById("phone_number").value 
// const address_input=document.getElementById("address_input").value


// }
































// PROFILE UPDATE FUNCTION
const updateProfile = async () => {
  const user = getCookie("user");
  const token = getCookie("token");

  // Input elements
  const full_name = document.getElementById("full_name");
  const email_address = document.getElementById("email_address");
  const phone_number = document.getElementById("phone_number");
  const address_input = document.getElementById("address_input");
  const messageBox = document.getElementById("error_message_box");

  // Reset message box
  messageBox.innerHTML = "";
  messageBox.className = "";

  // Validation
  if (
    !full_name.value.trim() ||
    !email_address.value.trim() ||
    !phone_number.value.trim() ||
    !address_input.value.trim()
  ) {
    messageBox.className = "alert alert-danger mt-3";
    messageBox.innerText = "⚠️ Please fill in all the fields before submitting.";
    return;
  }

  // Optional: Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email_address.value)) {
    messageBox.className = "alert alert-danger mt-3";
    messageBox.innerText = "⚠️ Please enter a valid email address.";
    return;
  }

  // Optional: Phone number validation (digits only)
  if (!/^[0-9]+$/.test(phone_number.value)) {
    messageBox.className = "alert alert-danger mt-3";
    messageBox.innerText = "⚠️ Phone number must contain digits only.";
    return;
  }
document.querySelector("#update_profile").innerHTML="Updating..."
  try {
    // API call
    const response = await fetch("http://localhost:5000/api/auth/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        user,
        full_name: full_name.value.trim(),
        email_address: email_address.value.trim(),
        phone_number: phone_number.value.trim(),
        address_input: address_input.value.trim(),
      }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        document.querySelector("#update_profile").innerHTML="Successfully Updated"
      messageBox.className = "alert alert-success mt-3";
      messageBox.innerText = "✅ Profile updated successfully!";
      appendProfile(result.user);
    } else {
       document.querySelector("#update_profile").innerHTML="Try Again"
      throw new Error(result.errMessage || "Failed to update profile.");

    }
  } catch (error) {
    messageBox.className = "alert alert-danger mt-3";
    messageBox.innerText = `❌ ${error.message}`;
    document.querySelector("#update_profile").innerHTML="Try Again"
  }
};

// Attach event listener
document.querySelector("#update_profile").onclick = (e) => {
  e.preventDefault();
  updateProfile();
};
