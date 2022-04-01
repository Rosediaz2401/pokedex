const pokemonContainer = document.querySelector('#pokemon-container')
const search = document.querySelector('#search')
const list = document.querySelector('#list')
let buscadorPokemon = [];



search.addEventListener("keyup", (e) => {
    list.innerHTML = "";
    pokemonContainer.innerHTML = "";
    let searching = buscadorPokemon.filter(({ name }) =>
    name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );

  searching.forEach(item => fetch(item.url)
  .then(response => response.json())
  .then(data => pokemonContainer.innerHTML += createCard(data.name,data.sprites.front_default,data.order,data.weight))
  ) 
  
  setTimeout(() => {
    moreInfoButton()

},3000)

//console.log(event.target.value)
if(e.target.value === ""){
    pokemonContainer.innerHTML = "";
    fetchPokemon()
}
});

function fetchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(response => response.json())
    .then(data => {
       const sdPokemon = data.results 
       buscadorPokemon = data.results    
        sdPokemon.forEach((data,i) => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
        .then(response => response.json())
        .then(data => pokemonContainer.innerHTML += createCard(data.name,data.sprites.front_default,data.order,data.weight))
        
        )
        setTimeout(() => {
            moreInfoButton()

        },3000)
    });
}
fetchPokemon()

function moreInfoButton (){
    const moreButton =Array.from(document.querySelectorAll('.pokemon-btn'))
    const moreList =Array.from(document.querySelectorAll('.list-group'))
    moreButton.forEach(item => item.addEventListener('click', () => {
        item.classList.toggle('my-active')
        if(item.classList.contains('my-active')){
            item.innerText = 'Show Less'
            item.previousElementSibling.style.display="block"
        } else{
            item.innerText = 'Look More'
            item.previousElementSibling.style.display="none"
        }
    }))
}

function createCard(name,sprite,number,weight) {
return ` 
<div class="a-box">
  <div class="img-container">
    <div class="img-inner">
      <div class="inner-skew">
        <img src="${sprite}">
      </div>
    </div>
  </div>
  <div class="text-container">
    <h5>${name}</h5>
    <ul style="display:none" class="list-group list-group-flush">
    <li class="list-group-item"> Number: ${number}</li>
    <li class="list-group-item">Weight: ${weight}</li>
  </ul>
  <button id="more-btn" class="pokemon-btn btn">Look More </button>
</div>
`
}


/*

<div class="card" style="width: 18rem;">
  <img src="${sprite}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
  </div>
  <ul style="display:none" class="list-group list-group-flush">
    <li class="list-group-item"> Number: ${number}</li>
    <li class="list-group-item">Weight: ${weight}</li>
  </ul>
  <button id="more-btn" class="pokemon-btn btn">Look More </button>
</div>

      //.sprites.front_default - sprites es el link y front_default es donde esta la imagen
        //pokemonSearch = data   <img src=${data.sprites.front_default}> imagenes
function fetchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/1`)
    .then(response => response.json())
    .then(data => {
        pokemonSearch = data   //.sprites.front_default - sprites es el link y front_default es donde esta la imagen
        console.log(pokemonSearch)
        Array.from(pokemonSearch).forEach(data => {
            pokemonContainer.innerHTML += data.name
        });   
    });
    //`<img src=${data.sprites.front_default}>` agregar imagen
}
fetchPokemon()
/*    
let printCard = document.querySelector('#print-card')
let card = document.createElement('div');
card.classList.add('card');
printCard.appendChild(card);

let printImg = document.createElement('img');
printImg.classList.add('card-img-top');
card.appendChild(printImg);

let cardBody = document.createElement('div');
cardBody.classList.add('card-body');
card.appendChild(cardBody)

let title = document.createElement('h5');
title.classList.add('card-title');
cardBody.appendChild(title)


let cardText = document.createElement('p')
cardText.classList.add('card-text');
cardBody.appendChild(cardText)

let listGroup = document.createElement('ul')
listGroup.classList.add('list-group', 'list-group-flush')
card.appendChild(listGroup)

let listItems = document.createElement('li')
listItems.classList.add('list-group-item')
listGroup.appendChild(listItems)
*/
