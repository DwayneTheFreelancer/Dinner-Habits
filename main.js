const RESTAURANT_BASE_URL = `https://developers.zomato.com/api/v2.1/search?q=location=`;
// const CORS_ANYWHERE = `https://cors-anywhere.herokuapp.com/?`;
const RESTAURANT_API_KEY = `apikey=9865a983d1e11caa8f7b6e6ef56b5964`;







const searchRestaurant = document.querySelector(".submit");
const displayRestaurants = document.querySelector("#display-restaurants");

// API TESTING AREA

// let restaurants = async () => {
//     await axios.get(`${RESTAURANT_BASE_URL}&${RESTAURANT_API_KEY}`, {
//         "user-key": RESTAURANT_API_KEY,
//     }).then(response => {
//         console.log(response.data.restaurants[0].restaurant);
//     }).catch(error => {
//         console.log(error);
//     })

// }

// restaurants();


// Test Second API

const FOOD_BASE_URL = `https://api.spoonacular.com/recipes/guessNutrition?title=`;
const FOOD_API_KEY = `apiKey=1594518a8c4746e6af5a3ab6327db881`;

let food = async () => {
    await axios.get(`${FOOD_BASE_URL}Spaghetti+Aglio+et+Olio&${FOOD_API_KEY}`, {
        "user-key": RESTAURANT_API_KEY,
        "Content-Type": "application/json"
    }).then(response => {
        console.log(response.data.protein.value);
    }).catch(error => {
        console.log(error);
    })
}

food();






// Find restaurant search button
searchRestaurant.addEventListener("click", async () => {
    const input = document.querySelector(".search");
    // User input value being stored to API query
    const userValue = input.value;
    const response = await axios.get(`${RESTAURANT_BASE_URL}${userValue}&${RESTAURANT_API_KEY}`, {
        // API content header
        "user-key": RESTAURANT_API_KEY,
    }).then(response => {
        // Variable to target the restaurants array
        const restaurantData = response.data.restaurants;
        // If statement to prevent sumbit button from loading more than one specific search
        if (displayRestaurants.innerHTML !== "") {
            displayRestaurants.innerHTML = "";
        }
        // Runs through restaurants array 
        for (let i = 0; i < restaurantData.length; i += 1) {
            // The array stops sending out data once 10 restaurants are displayed
            restaurantData.length = 10;
            // If statement for when data is empty or not showing 
            // All data here will be displayed as unavailable 
            if (restaurantData[i].restaurant.thumb === "" || restaurantData[i].restaurant.location === "" || restaurantData[i].restaurant.user_rating.aggregate_rating === 0 || restaurantData[i].restaurant.timings === "") {
                displayRestaurants.innerHTML += `
                    <div id="restaurants-info">
                        // Add <a href="></a> around h1 and img tags with links to restaurants websites
                        <h1>${restaurantData[i].restaurant.name}</h1>
                        <img src="img/not-available.png" />
                        <div class="address">Address Not Available</div>
                        <div>${restaurantData[i].restaurant.cuisines}</div>
                        <div>Open Hours Unavailable</div>
                        <div>No Rating</div>
                    </div>
                    <hr>
                `; 
            } else {
                // Displays data that was availabale from the API
                displayRestaurants.innerHTML += `
                <div id="restaurants-info">
                    <h1>${restaurantData[i].restaurant.name}</h1>
                    <img src="${restaurantData[i].restaurant.thumb}" />
                    <div class="address">${restaurantData[i].restaurant.location.address}</div>
                    <div class="categories">${restaurantData[i].restaurant.cuisines}</div>
                    <span>${restaurantData[i].restaurant.timings}<span>
                    <div class="rating">
                        ${restaurantData[i].restaurant.user_rating.aggregate_rating}
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                    </div>

                </div>
                <hr>
            `;
            }
        } 
    }).catch(error => {
        console.log(error);
    })
});