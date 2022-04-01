const search = document.querySelector('#id')
const pokemonContainer = document.querySelector('#pokemon-container')
const printCard = document.querySelector('#print card')
const pokemones = [];

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(res => {
    return res.json()
  })