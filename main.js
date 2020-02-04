const RESTAURANT_BASE_URL = `https://developers.zomato.com/api/v2.1/search?q=location=`;
// const CORS_ANYWHERE = `https://cors-anywhere.herokuapp.com/?`;
const RESTAURANT_API_KEY = `apikey=9865a983d1e11caa8f7b6e6ef56b5964`;

const FOOD_BASE_URL = `https://api.spoonacular.com/recipes/search?query=`;





const searchRestaurant = document.querySelector(".submit");
const displayRestaurants = document.querySelector("#display-restaurants");

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


searchRestaurant.addEventListener("click", async () => {
    const input = document.querySelector(".search");
    const userValue = input.value;
    const response = await axios.get(`${RESTAURANT_BASE_URL}${userValue}&${RESTAURANT_API_KEY}`, {
        "user-key": RESTAURANT_API_KEY,
    }).then(response => {
        const restaurantData = response.data.restaurants;
        // const locationData = response.data.restaurants.location;
        if (displayRestaurants.innerHTML !== "") {
            displayRestaurants.innerHTML = "";
        }
        for (let i = 0; i < restaurantData.length; i += 1) {
            restaurantData.length = 10;
            if (restaurantData[i].restaurant.thumb === "" || restaurantData[i].restaurant.location === "" || restaurantData[i].restaurant.user_rating.aggregate_rating === 0 || restaurantData[i].restaurant.timings === "") {
                displayRestaurants.innerHTML += `
                    <div id="restaurants-info">
                        <h1>${restaurantData[i].restaurant.name}</h1>
                        <img src="img/not-available.png" />
                        <div>Address Not Available</div>
                        <div>${restaurantData[i].restaurant.cuisines}</div>
                        <div>No Rating</div>
                        <div>Open Hours Unavailable</div>
                    </div>
                `; 
            } else {
                displayRestaurants.innerHTML += `
                <div id="restaurants-info">
                    <h1>${restaurantData[i].restaurant.name}</h1>
                    <img src="${restaurantData[i].restaurant.thumb}" />
                    <div>${restaurantData[i].restaurant.location.address}</div>
                    <div>${restaurantData[i].restaurant.cuisines}</div>
                    <div>${restaurantData[i].restaurant.user_rating.aggregate_rating}
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                        <span style='font-size:30px;'>&#9734;</span>
                    </div>
                    <span>${restaurantData[i].restaurant.timings}<span>
                </div>
            `;
            }
        } 
    }).catch(error => {
        console.log(error);
    })
});