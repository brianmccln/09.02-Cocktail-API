// Lesson 09.02 Cocktail API

// this is for the search box:
const ckbox = document.querySelector('#show-all')
ckbox.addEventListener('checkbox', getCocktail);
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// searchUrl + "s=" + this.value

const search = document.querySelector('#search-box');
search.addEventListener('search', getCocktail);

// this is for the select menu:
const select = document.querySelector('select');
select.addEventListener('change', getCocktail);
// searchUrl + "i=" + this.value

const cocktailBox = document.querySelector('#cocktail-box');

const btn = document.querySelector('button');
btn.addEventListener('click', getCocktail);

// "GET" specifies how is the data to be sent from the 
// server -- GET means the data rides along on the URL
// fetch(url, method) and it returns a so-called Promise
// function getRandomCocktail() {
//     console.log("getRandomCocktail");
//     // .then() runs once the Promise is fulfilled / data is here
//     // parse the json (remove quotes)
//     let randUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";
//     fetch(randUrl, {method: "GET"})
//     .then(res => res.json())
//     .then(obj => {
//         const drink = obj.drinks[0];
//         cocktailName.textContent = drink.strDrink;
//         cocktailInfo.textContent = drink.strInstructions;
//         cocktailImg.src = drink.strDrinkThumb;
//     })
//     .catch(err => console.log("Something went wrong", err))
// };

// // searchForCocktail() func is called by search box AND select menu
// function searchForCocktail() {
//     let url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${this.value}`;
//     fetch(url, {method: "GET"})
//     .then(res => res.json())
//     .then(obj => {
//         const drink = obj.drinks[0];
//         cocktailName.textContent = drink.strDrink;
//         cocktailInfo.textContent = drink.strInstructions;
//         cocktailImg.src = drink.strDrinkThumb;
//     })
//     .catch(err => console.log("Something went wrong", err))
// };

// CHALLENGE 1: Make this all work w just ONE function called getCocktail():

function getCocktail(){
    let url = "https:thecocktaildb.com/api/json/v1/1/";
    if(this.value){
        url += `search.php?s=${this.value}`;
    } else if(this.id.length == 1){
        url += `search.php?f=${this.id}`;
    } else{
        url += "random.php";
    }
    fetch(url, {method: "GET"})
    .then(res => res.json())
    .then(obj => {
        cocktailBox.innerHTML = "";
        for(let i = 0; i < obj.drinks.length; i++){
            const drink = obj.drinks[i];
            const drinkDiv = document.createElement("div");
            drinkDiv.className = "drink-div";
            cocktailBox.appendChild(drinkDiv);
            let drinkNameH1 = document.createElement('h1');
            drinkNameH1.textContent = drink.strDrink;
            drinkDiv.appendChild(drinkNameH1);
            let drinkInfoP = document.createElement('p');
            drinkInfoP.textContent = drink.strInstructions;
            drinkDiv.appendChild(drinkInfoP);
            let drinkPic = new Image();
            drinkPic.src = drink.strDrinkThumb;
            drinkDiv.appendChild(drinkPic);
            
            if(!ckbox.checked) break
        };
    })
    .catch(err => console.log("Something went wrong", err))
};

// Challenge 2: Make 26 buttons, one per letter, and put them into the btn-div. The css for the buttons is already done. Use the letter-btn class for each button. Have each button call a function called getCocktailsByLetter():
// Hint: refer to Chinese Zodiac Animals (06.02-06.03) for how to make elements dynamicallyw/ a loop.
// Hint 2: each button needs an id and text content, which in both cases is just the letter.

const btnDiv = document.getElementById("btn-div");

for (let letter = 'A'; letter <= 'Z'; letter = String.fromCharCode(letter.charCodeAt(0) + 1)) {
    if(letter == "U" || letter == "X") continue;
    const button = document.createElement("button");
    button.textContent = letter;
    button.id = letter.toLowerCase();
    button.className = "letter-btn";
    button.addEventListener("click", getCocktail);
    btnDiv.appendChild(button);
};