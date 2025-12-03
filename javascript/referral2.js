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




// async function fetchReferrals() {
//   const user = getCookie("user");
//   const token = getCookie("token");

//   try {
//     const response = await fetch("http://localhost:5000/api/user/referral", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user, token }),
//     });

//     const result = await response.json();
//     console.log(result);
//     if (!response.ok) throw new Error(result.errMessage || "Failed to load referral data");

//     // Update stats
//     // document.querySelector("#totalReferrals").innerText = result.totalReferrals || 0;
//     // document.querySelector("#totalBonus").innerText = `₦${result.totalBonus?.toLocaleString() || 0}`;
//     // document.querySelector("#totalOrders").innerText = result.totalOrders || 0;

//     // // Update referral link
//     // const refCode = result.referralCode || "CHD0000";
//     // document.querySelector("#refLink").value = `https://chidoskitchen.com/ref?code=${refCode}`;

//     // // Update referral list
//     // const tableBody = document.querySelector("#referralTableBody");
//     // tableBody.innerHTML = ""; // clear old rows

//     // if (result.referrals && result.referrals.length > 0) {
//     //   result.referrals.forEach(ref => {
//     //     const row = document.createElement("tr");
//     //     row.innerHTML = `
//     //       <td>${ref.name}</td>
//     //       <td>${ref.orders}</td>
//     //       <td>₦${ref.bonus.toLocaleString()}</td>
//     //     `;
//     //     tableBody.appendChild(row);
//     //   });
//     // } else {
//     //   tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No referrals yet 😔</td></tr>`;
//     // }
//   } catch (error) {
//     console.error(error);
//     // document.querySelector("#referralTableBody").innerHTML = `
//     //   <tr><td colspan="3" class="text-center text-danger">${error.message}</td></tr>
//     // `;
//   }
// }

// // Copy referral link
// function copyReferral() {
//   const link = document.querySelector("#refLink");
//   link.select();
//   link.setSelectionRange(0, 99999);
//   navigator.clipboard.writeText(link.value);
//   alert("Referral link copied!");
// }

// // Auto-fetch referrals on load
// window.addEventListener("DOMContentLoaded", fetchReferrals);

// Helper for cookie








const appendReferralDetails = (user) => {
  console.log("Appending user data to dashboard:", user);

document.getElementById("wallet").textContent = `₦${user.walletBalance.toLocaleString()}` || "₦0.00";
  document.getElementById("totalReferrals").textContent = user.totalReferrals || "0";
  document.getElementById("totalBonus").textContent = `₦${user.referralBonus.toLocaleString()}` || "₦0.00";
document.getElementById("totalOrders").textContent = user.totalOrders || "0";
document.getElementById("refLink").value = user.referralLink || "https://chidoskitchen.com/ref?code=XXXXXX";
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
       appendReferralDetails(result.user)
        } else{
            throw new Error(result.errMessage || "Failed to fetch user profile")
        }
    } catch (error) {
      console.error(error)
        alert(error.message)
    }
}

)()






