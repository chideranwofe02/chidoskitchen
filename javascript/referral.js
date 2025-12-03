async function fetchReferrals() {
  const user = getCookie("user");
  const token = getCookie("token");

  try {
    const response = await fetch("http://localhost:5000/api/user/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, token }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.errMessage || "Failed to load referral data");

    // Update stats
    document.querySelector("#totalReferrals").innerText = result.totalReferrals || 0;
    document.querySelector("#totalBonus").innerText = `₦${result.totalBonus?.toLocaleString() || 0}`;
    document.querySelector("#totalOrders").innerText = result.totalOrders || 0;

    // Update referral link
    const refCode = result.referralCode || "CHD0000";
    document.querySelector("#refLink").value = `https://chidoskitchen.com/ref?code=${refCode}`;

    // Update referral list
    const tableBody = document.querySelector("#referralTableBody");
    tableBody.innerHTML = ""; // clear old rows

    if (result.referrals && result.referrals.length > 0) {
      result.referrals.forEach(ref => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${ref.name}</td>
          <td>${ref.orders}</td>
          <td>₦${ref.bonus.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No referrals yet 😔</td></tr>`;
    }
  } catch (error) {
    console.error(error);
    document.querySelector("#referralTableBody").innerHTML = `
      <tr><td colspan="3" class="text-center text-danger">${error.message}</td></tr>
    `;
  }
}

// Copy referral link
function copyReferral() {
  const link = document.querySelector("#refLink");
  link.select();
  link.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(link.value);
  alert("Referral link copied!");
}

// Auto-fetch referrals on load
window.addEventListener("DOMContentLoaded", fetchReferrals);

// Helper for cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}
