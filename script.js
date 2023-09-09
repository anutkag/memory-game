const gameContainer = document.getElementById("game");
let button=document.querySelector("#startGame");
let score=document.querySelector("#score");
let card1 = null;
let input= document.querySelector("input");
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

let COLORS = [
  
];

function generateRandomColor(){
  let r= Math.floor(Math.random() * 255);
  let b= Math.floor(Math.random() * 255);
  let g= Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      score.innerHTML = "score: "+cardsFlipped/2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) {
    alert("game over!");
    let name=prompt("what is your name?")
    let newPlayer={name:name,score:cardsFlipped/2}
    let previousScores=localStorage.getItem("scores");
    if(previousScores){
      previousScores=JSON.parse(previousScores);
    }else{
previousScores=[]
    }
    previousScores.push(newPlayer);
    let bestPlayer=null;
    previousScores.forEach(function(score){
      if (!bestPlayer||score.score>bestPlayer.score){
        bestPlayer=score; 
      }
    }) 
    localStorage.setItem("scores",JSON.stringify(previousScores));
    alert(`best player was ${bestPlayer.name} with score ${bestPlayer.score}`);
    button.style.display="block"
  }
}
button.onclick=function(){
  COLORS=[]
  let amount=Number(input.value)
  for (let i = 0;i<amount;i++){
    let randomColor=generateRandomColor()
    COLORS.push(randomColor,randomColor);
  }  
  gameContainer.innerHTML="";
  cardsFlipped=0;
  score.innerHTML="";
let shuffledColors = shuffle(COLORS);

  createDivsForColors(shuffledColors);
  button.style.display="none"

}
