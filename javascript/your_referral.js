
appendReferedUsers=(referrals)=>{
    console.log("ref",referrals)
    const container=document.getElementById("referralTableBody");
    const container_tr=document.createElement("tr")
    const full_name_td=document.createElement("tr")
    const orderName_td=document.createElement("tr")
    const referralEarning_td=document.createElement("tr")

    referrals.forEach(referral=>{
        const tr=document.createElement("tr");  
        tr.innerHTML=`
        <th>${referral.fullName || "No Name"}</th>
        <th>${referral.totalOrders || 0}</th>
        <th>₦${referral.referralEarningForReferrer || 0}</th>
        `;
        document.getElementById("errMessage").style.display="none";
        container.appendChild(tr);
    })

    // container.innerHTML="";
    // if(referrals.length===0){
    //     container.appendChild("<tr><td colspan='3' class='text-center text-muted'>Loading referrals...</td></tr>");
    //     return;
    // }   
    // referrals.forEach(referral=>{
    //     const div=document.createElement("div");
    //     div.className="referral-card";      
    //     div.innerHTML=`
    //     <h3>${referral.name || "No Name"}</h3>
    //     <p><strong>Email:</strong> ${referral.email || "N/A"}</p>
    //     <p><strong>Joined On:</strong> ${new Date(referral.createdAt).toLocaleDateString() || "N/A"}</p>
    //     `;
        // container.appendChild(div);
    // });
}


(async()=>{
    const user = getCookie("user");
    const token = getCookie("token");
    try {
        const response = await fetch(
          "http://localhost:5000/api/referrals",
          // "http://localhost:5000https://crescentpipsltdbackend-production.up.railway.app/user/find",

          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token, user }),
          },
        );
        const result=await response.json()
        console.log(result)
        if(result.error===false){
            appendReferedUsers(result.message)
        } else{
                      document.getElementById("errMessage").innerHTML=result.errMessage|| "Failed to fetch referrals..."

            // throw new Error(result.errMessage || "Failed to fetch referrals...")
        }

      //   if(response.ok){
      //  appendReferedUsers(result.message)
      //   } else{
      //       throw new Error(result.errMessage || "Failed to fetch user profile")
      //   }
    } catch (error) {
      console.error(error)
        alert(error.message)
    }
}

)()
