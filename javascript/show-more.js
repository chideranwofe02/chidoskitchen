// const appendFoodList = (foodItems) => {
// //   const col_lg_div=document.createElement("div")
// //   const   card_food_card =document.createElement("div")
// // const img=document.createElement("img")
// // const mt_h5=document.createElement("h5")
// // const price_p=document.createElement("p")
// // const button=document.createElement("button")
// // col_lg_div.className="col-lg-4 col-md-6"
// // card_food_card.className="card food-card p-3"
// // // img.src=foodItems[0].imageUrl ||"https://source.unsplash.com/400x250/?rice"
// // mt_h5.className="mt-3"
// // price_p.className="text-danger fw-bold"
// // button.className="subscribe-btn"
// // button.innerText="Order Now";

// // foodItems.forEach((foodItem)=>{
// //     img.src=foodItem.imageUrl ||"https://source.unsplash.com/400x250/?rice"
// //     mt_h5.innerText=foodItem.name ||"Food Name"
// //     price_p.innerText=`₦${foodItem.price}` ||"₦0.00"
// //     card_food_card.appendChild(img)
// //     card_food_card.appendChild(mt_h5)
// //     card_food_card.appendChild(price_p)
// //     card_food_card.appendChild(button)
// //     col_lg_div.appendChild(card_food_card)
// //     document.getElementById("food-section").appendChild(col_lg_div)

// // }
// // )

// const food_card_div=document.createElement("div")
// const food_img=document.createElement("img")
// const food_info_div=document.createElement("div")
// const food_h3=document.createElement("h3")
// const food_price_p=document.createElement("p")
// const addToCartButton=document.createElement("button")


// foodItems.forEach((foodItem)=>{
//     food_card_div.className="food-card"
//     food_img.src=foodItem.image ||"https://source.unsplash.com/400x250/?rice"
//     food_info_div.className="food-info"         
//     food_h3.innerText=foodItem.name ||"Food Name"   


//     food_price_p.innerText=`₦${foodItem.price}` ||"₦0.00"
//     addToCartButton.className="add-to-cart-btn"
//     addToCartButton.innerText="Add to Cart"
//     addToCartButton.onclick=function(){




//         addToCart(foodItem._id, foodItem.name, foodItem.price);       
//     }
//     food_info_div.appendChild(food_h3)
//     food_info_div.appendChild(food_price_p)
//     food_info_div.appendChild(addToCartButton)
//     food_card_div.appendChild(food_img)
//     food_card_div.appendChild(food_info_div)
//     document.getElementById("foodGrid").appendChild(food_card_div)
// }

// // foodItems.forEach((foodItem)=>{
// //     food_card_div.className="food-card"
// //     food_img.src=foodItem.image ||"https://source.unsplash.com/400x250/?rice"
// //     food_info_div.className="food-info"
// //     food_h3.innerText=foodItem.name ||"Food Name"
// //     food_price_p.innerText=`₦${foodItem.price}` ||"₦0.00"
// //     addToCartButton.className="add-to-cart-btn"
// //     addToCartButton.innerText="Add to Cart"
// //     addToCartButton.onclick=function(){

// //         addToCart(foodItem._id, foodItem.name, foodItem.price);       

// // 

// )}



function setCookie(name, value, days = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${JSON.stringify(value)};${expires};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return JSON.parse(value);
    }
    return null;
}


let cartCount = 0;

let cart = getCookie("cart") || [];
document.getElementById('cartCount').innerText = cart.length;




function addToCart(id, name, price) {
    console.log("Adding to cart:", id, name, price);

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += 1;  // Increase quantity
    } else {
        // Add new item as object
        cart.push({
            id: id,
            name: name,
            price: price,
            qty: 1
        });
    }

    // Save cart to cookie
    setCookie("cart", cart);

    // Update UI count
    document.getElementById('cartCount').innerText = cart.length;

    console.log("Current Cart:", cart);
}




const appendFoodList = (foodItems) => {
  const foodGrid = document.getElementById("foodGrid");
  foodGrid.innerHTML = ""; 

  foodItems.forEach((foodItem) => {
    const foodCard = document.createElement("div");
    foodCard.className = "food-card";

    const foodImg = document.createElement("img");
    foodImg.src = foodItem.image || "https://source.unsplash.com/400x250/?food";
    foodImg.alt = foodItem.name || "Food Image";

    const foodInfo = document.createElement("div");
    foodInfo.className = "food-info";

    const foodName = document.createElement("h3");
    foodName.innerText = foodItem.name || "Unnamed Food";

    const foodPrice = document.createElement("p");
    foodPrice.innerText = `₦${foodItem.price || 0}`;

    // 🔥 Check if item is already in cookie cart
    const alreadyInCart = cart.some(c => c.id === foodItem._id);

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "add-to-cart-btn";

    if (alreadyInCart) {
      addToCartButton.innerHTML = "Added &#10003;";
      addToCartButton.disabled = true;
      addToCartButton.style.background = "#4CAF50";
      addToCartButton.style.color = "#fff";
    } else {
      addToCartButton.innerText = "Add to Cart";
      addToCartButton.onclick = () => {
        addToCart(foodItem._id, foodItem.name, foodItem.price);

        // Change UI after adding
        addToCartButton.innerHTML = "Added &#10003;";
        addToCartButton.disabled = true;
        addToCartButton.style.background = "#4CAF50";
        addToCartButton.style.color = "#fff";
      };
    }

    foodInfo.appendChild(foodName);
    foodInfo.appendChild(foodPrice);
    foodInfo.appendChild(addToCartButton);

    foodCard.appendChild(foodImg);
    foodCard.appendChild(foodInfo);

    foodGrid.appendChild(foodCard);
  });
};


// const appendFoodList = (foodItems) => {
//   const foodGrid = document.getElementById("foodGrid");
//   foodGrid.innerHTML = ""; // clear old data first

//   foodItems.forEach((foodItem) => {
//     // Create a fresh set of elements for each food item
//     const foodCard = document.createElement("div");
//     foodCard.className = "food-card";

//     const foodImg = document.createElement("img");
//     foodImg.src = foodItem.image || "https://source.unsplash.com/400x250/?food";
//     foodImg.alt = foodItem.name || "Food Image";

//     const foodInfo = document.createElement("div");
//     foodInfo.className = "food-info";

//     const foodName = document.createElement("h3");
//     foodName.innerText = foodItem.name || "Unnamed Food";

//     const foodPrice = document.createElement("p");
//     foodPrice.innerText = `₦${foodItem.price || 0}`;

//     const addToCartButton = document.createElement("button");
//     addToCartButton.className = "add-to-cart-btn";
//     addToCartButton.innerText = "Add to Cart";
//     addToCartButton.onclick = () => {
//       addToCartButton.innerHTML="Added &#10003;";

//       addToCart(foodItem._id, foodItem.name, foodItem.price);
//     }
//     // Append elements
//     foodInfo.appendChild(foodName);
//     foodInfo.appendChild(foodPrice);
//     foodInfo.appendChild(addToCartButton);

//     foodCard.appendChild(foodImg);
//     foodCard.appendChild(foodInfo);

//     // Finally add this card to the grid
//     foodGrid.appendChild(foodCard);
//   });
// };








(async()=>{
    // const user = getCookie("user");
    // const token = getCookie("token");
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
       appendFoodList(result.foodItems)
        } else{
            throw new Error(result.errMessage || "Failed to fetch user profile")
        }
    } catch (error) {

document.getElementById("errMessage").innerHTML=error.message    }
}

)()





