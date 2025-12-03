// const appendFoodtoDashboard = (foodItems) => {
//   const col_lg_div=document.createElement("div")
//   const   card_food_card =document.createElement("div")
// const img=document.createElement("img")
// const mt_h5=document.createElement("h5")
// const price_p=document.createElement("p")
// const button=document.createElement("button")
// col_lg_div.className="col-lg-4 col-md-6"
// card_food_card.className="card food-card p-3"
// // img.src=foodItems[0].imageUrl ||"https://source.unsplash.com/400x250/?rice"
// mt_h5.className="mt-3"
// price_p.className="text-danger fw-bold"
// button.className="subscribe-btn"
// button.innerText="Order Now";

// foodItems.forEach((foodItem)=>{
//     img.src=foodItem.image ||"https://source.unsplash.com/400x250/?rice"
//     mt_h5.innerText=foodItem.name ||"Food Name"
//     price_p.innerText=`₦${foodItem.price}` ||"₦0.00"
//     card_food_card.appendChild(img)
//     card_food_card.appendChild(mt_h5)
//     card_food_card.appendChild(price_p)
//     card_food_card.appendChild(button)
//     col_lg_div.appendChild(card_food_card)
//     document.getElementById("food-section").appendChild(col_lg_div)

// }
// )
// }


const appendFoodtoDashboard = (foodItems) => {
  const foodSection = document.getElementById("food-section");
  foodSection.innerHTML = ""; // clear old items

  foodItems.forEach((foodItem) => {
    // Create a new card per item
    const colDiv = document.createElement("div");
    colDiv.className = "col-lg-4 col-md-6";

    const card = document.createElement("div");
    card.className = "card food-card p-3";

    const img = document.createElement("img");
    img.src = foodItem.image || "https://source.unsplash.com/400x250/?rice";
    img.alt = foodItem.name || "Food Image";

    const name = document.createElement("h5");
    name.className = "mt-3";
    name.innerText = foodItem.name || "Food Name";

    const price = document.createElement("p");
    price.className = "text-danger fw-bold";
    price.innerText = `₦${foodItem.price || 0}`;

    const button = document.createElement("button");
    button.className = "subscribe-btn";
    button.innerText = "Order Now";

    // Append all children
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(button);

    colDiv.appendChild(card);
    foodSection.appendChild(colDiv);
  });
};









(async()=>{
    const user = getCookie("user");
    const token = getCookie("token");
    try {
        const response = await fetch(
          "http://localhost:5000/api/food/fetch",
          // "http://localhost:5000https://crescentpipsltdbackend-production.up.railway.app/user/find",

          {
            method: "GET",
            headers: { "content-type": "application/json" },
            // body: JSON.stringify({ token, user }),
          },
        );
        const result=await response.json()
        console.log(result)
        if(response.ok){
       appendFoodtoDashboard(result.foodItems)
        } else{
            throw new Error(result.errMessage || "Failed to fetch user profile")
        }
    } catch (error) {

document.getElementById("errMessage").innerHTML=error.message    }
}

)()
