// Lesson 09.02 Cocktail API
alert("hola");
// this is for the search box:
const ckbox = document.querySelector('#show-all')
ckbox.addEventListener('change', getCocktail);
// www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka
// searchUrl + "s=" + this.value
 
const search = document.querySelector('#search-box');
search.addEventListener('search', getCocktail);
 
// this is for the select menu:
const select = document.querySelector('select');
select.addEventListener('change', getCocktail);
// searchUrl + "i=" + this.value
 
const cocktailImg = document.querySelector('#cocktail-box img');
const cocktailInfo = document.querySelector('#cocktail-info');
const cocktailName = document.querySelector('#cocktail-name');
 
const btn = document.querySelector('button');
btn.addEventListener('click', getCocktail);

function getCocktail() {
    let url = "https:thecocktaildb.com/api/json/v1/1/";
    if(this.value) {
        url += `search.php?s=${this.value}`;
    } else if(this.id.length == 1){
        url += `search.php?f=${this.id}`;
    } else {
        url += "random.php";
    }
    fetch(url, {method: "GET"})
    .then(res => res.json())
    .then(obj => {
        console.log("Num drinks:", obj.drinks.length);
        const drink = obj.drinks[0];
        cocktailName.textContent = drink.strDrink;
        cocktailInfo.textContent = drink.strInstructions;
        cocktailImg.src = drink.strDrinkThumb;
    })
    .catch(err => console.log("Something went wrong", err));
};

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
 
// Challenge 3: Refactor the getCocktail() function so that:
    // IF Show All Results checkbox is checked, ALL results are outputeed
    // if the checkbox is NOT checked, only output ONE result
    // BUT don't just output drinks[0] the first result every time
    // output a random result
 
    // function getCocktailsByLetter(){
 
// };