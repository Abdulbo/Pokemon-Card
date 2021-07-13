let root = document.querySelector('#root');
let form = document.querySelector('#form')
let inputTitle = document.querySelector('#inputTitle');
let inputTetx = document.querySelector('#inputText');
let button = document.querySelector('#button');
let inputYear = document.querySelector('#inputYear');
let textHeight = document.querySelector(".text-height");
let textWeight = document.querySelector(".text-weight");
let listWeaknesses = document.querySelector(".list-weaknesses");
let listnextEvalition  = document.querySelector("listNextEvalition");
let wrapperCard = document.querySelector(".wrapper-card")
let wrapperimg = document.querySelector(".wrapper-img")
let list = document.querySelector(".item");
let formtype = document.querySelector('.filterForm');
let foundFilms = document.querySelector(".Pokemons-length")
let SortSelect = document.querySelector("#sort")
let Search = document.querySelector("#searchInput");
let searchForm = document.querySelector(".searchForm");
let LikedWrapper = document.querySelector("#likedWrapper");
let textId = document.querySelector(".text-id")




function renderer(data) {
  root.innerHTML = null
  

  data.forEach(element => {


    let card = document.createElement('div');
    let img = document.createElement('img');
    let title = document.createElement('h1');
    let text = document.createElement('p');
    let weight = document.createElement('p');
    let textdata = document.createElement('span');

    let dat = new Date(element.birth_date);
    let s = dat.getFullYear()
    textdata.textContent = s;

    let kg = Math.round(element.weight - 0) + " " + "kg"


    img.src = element.img;
    img.style.border = 'solid black'
    title.textContent = element.name;
    text.textContent = element.type;
    weight.textContent = kg

    card.value = element.id;
    card.classList.add('h');
    title.classList.add("title");
    text.classList.add('text')

    text.style.color = 'white';
    text.style.textAlign = 'center';
    title.style.color = 'yellow';
    img.style.border = "3px solid white"
    img.style.borderRadius = '3px'
    textdata.style.textAlign = 'center'
    textdata.style.padding = '2px'
    title.style.textAlign = 'center';
    weight.style.textAlign = 'center'
    let lsit = document.createElement("ul")
 
    let pokemonMoreBtn  = document.createElement("button")
    pokemonMoreBtn.dataset.id  = element.id
    pokemonMoreBtn.textContent = "Infosi"
    pokemonMoreBtn.type = "button"
     pokemonMoreBtn.classList.add("moreInfo")


    let   likeBtn =  document.createElement("button");
    likeBtn.textContent = 'Like'
    likeBtn.classList.add = ("likeBtn")

    
    pokemonMoreBtn.addEventListener("click" , function(evt){
      
      listWeaknesses.innerHTML = ""
    
      let clickId = evt.target.dataset.id - 0 ;
      
      let foundPokemon  = pokemons.find((pokemon) => {
        
        return pokemon.id === clickId
        
      })
      
      textHeight.textContent = foundPokemon.name
      textWeight.textContent = foundPokemon.weight
      wrapperimg.src = foundPokemon.img
      foundPokemon.weaknesses.forEach((elm) =>{
        let items = document.createElement("li");
        items.style.listStyleType = "none"
        items.style.margin = '2px'
        items.style.fontWeight = "bold"

        items.textContent = elm
      
        listWeaknesses.append(items)
      })

      foundPokemon.next_evolution.forEach((evlution) =>{
        let title = document.createElement("h3");
        title.style.color = "blue"
        title.textContent = evlution.name;
        listWeaknesses.append(title)
      })
    })


    let item = document.createElement('li');
    item.classList.add("item")
    item.textContent = element.type;
    lsit.append(item)


    card.append(pokemonMoreBtn)
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(textdata)
    card.appendChild(weight)
    card.append(lsit);
    card.append(likeBtn)
    root.appendChild(card)

  });


}

// renderer(pokemons)

form.addEventListener('submit', (event) => {
  event.preventDefault()

  let obj = {
    img: " https://picsum.photos/200",
    name: inputTitle.value,
    type: inputTetx.value,
    birth_date: inputYear.value

  }
  pokemons.unshift(obj);
  renderer(pokemons)

  inputTetx.value = ''
  inputTitle.value = ''
  inputYear.value = ''
})


renderer(pokemons);




let nameSort  = function(a ,b ){
if(a.name > b.name){
  return 1
}if(a.name < b.name){
  return -1
}
return 0
}

let nameSortRevers  = function(a ,b ){
  if(a.name > b.name){
    return -1
  }if(a.name < b.name){
    return 1
  }
  return 0
  }
  
  let data = function (a , b){
  return a.birth_date - b.birth_date
  }


  let dataReavers = function (a ,b){
    return b.birth_date - a.birth_date
  }

  let SortFunction =  {
    "0": nameSort,
    "1": nameSortRevers,
    "2": data,
    "3": dataReavers,
    
  }

let getType = function (pokemons) {
  let arr = []
  pokemons.forEach((element) => {
    element.type.forEach((typeItem) => {
      if (!arr.includes(typeItem)) {
        arr.push(typeItem)
      }
    })
  })
  return arr
}

let res = getType(pokemons);
let selectTypes = document.querySelector("#taypes");

res.forEach((type) => {
  let typeOption = document.createElement("option");

  typeOption.value = type;
  typeOption.textContent = type;
  selectTypes.append(typeOption)
})


formtype.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(`submitted`);
  let SearchValue = new RegExp(Search.value, "gi")
  let filteredPokemons = pokemons.filter(function (pokemon) {
    let dasTaypeMatch = selectTypes.value === "0" ? true : pokemon.type.includes(selectTypes.value)
    let dasNameMatch =   pokemon.name.match(SearchValue)
    
    return dasTaypeMatch  && dasNameMatch
  }).sort(SortFunction[SortSelect.value])
  foundFilms.textContent = filteredPokemons.length;
renderer(filteredPokemons);
})



 











let resa = pokemons.findIndex((pokemon) =>{
  return pokemon[2]
})


















let likesData = []



root.addEventListener('click' , function(evt){
  
 if(evt.target.matches("moreInfo")){
let clickedId = evt.target.dataset.id - 0;
let foundFilm = pokemons.find(function(film){
  return film.id === clickedId
 })
 textId.textContent = foundFilm.name
 } 
 if(evt.target.matches(".likeBtn")){
   let clickedId = evt.target.dataset.id - 0;
   let isThereLikedPokemons = likesData.some(function (film){
     return film.id === clickedId
   })
   if(!isThereLikedPokemons){
     let founPokemon = pokemons.find(function(pokemon){
       return pokemon.id === clickedId
     })
     likesData.push(founPokemon)
   }
 }
})

console.log(likesData)

