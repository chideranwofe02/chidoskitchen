const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
  window.location.href = "/login.html";
};


const appendUserDataToDashboard = (user) => {
  console.log("Appending user data to dashboard:", user);
  document.getElementById("user-name").textContent = user.fullName || "failed to load";
  // document.querySelector("#user-email").textContent = user.email || "No Email";
  document.getElementById("balance").textContent = `₦${user.walletBalance.toFixed(2)}` || "₦0.00";
  document.getElementById("active_subscription").textContent = user.ActiveSubscription || "No Active Subscription";
  document.getElementById("referralBonus").textContent = `₦${user.referralBonus.toFixed(2)}` || "₦0.0";
  document.getElementById("totalOrders").textContent = user.totalOrders || "0";
  document.getElementById("referral_link").value = user.referralLink || "https://chidoskitchen.com/ref?code=XXXXXX";
   document.getElementById("referral_link").attributes.readOnly = true;
  // document.getElementById("user-email").textContent = user.email || "   


// No Email"; document.getElementById("balance").          
// textContent = `₦${user.walletBalance.toFixed(2)}` || "₦0.00"; };  

}



(async()=>{
    const user = getCookie("user");
    const token = getCookie("token");
    try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          // "http://localhost:5000https://crescentpipsltdbackend-production.up.railway.app/user/find",

          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token, user }),
          },
        );
        const result=await response.json()
        console.log(result)
        if(response.ok){
       appendUserDataToDashboard(result.user)
        } else{
            throw new Error(result.errMessage || "Failed to fetch user profile")
        }
    } catch (error) {
        alert(error.message)
    }
}

)()
