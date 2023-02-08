import Keyboard from 'simple-keyboard';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'simple-keyboard/build/css/index.css';
import './css/styles.css';

const keyboard = new Keyboard({
  onKeyPress: button => onKeyPress(button)
});


function onKeyPress(button){
  displayLetter(button);
}


function getDino() {
  let xhr = new XMLHttpRequest();
  let url = 'https://dinoipsum.com/api?format=json&paragraphs=1&words=1';

  xhr.open('GET', url, false);
  xhr.addEventListener('loadend', function() {
    let response = JSON.parse(this.responseText);
    if (this.status === 200) {
      displayDino(response);
    } else {
      printError(this, response);
    }
  });
  document.querySelector("div.hideGame").removeAttribute("class");
  xhr.send();
}

function displayDino(response) {
  document.getElementById("dinoName").innerHTML = null;
  document.getElementById("usedLetters").innerHTML = null;
  let splitArray = response[0][0].split("");
  let dinoNameDisplay = document.getElementById('dinoName');
  splitArray.forEach(function(element, index) {
    let p = document.createElement('p');
    p.setAttribute('id', index);
    p.setAttribute('class', "hidden inline");
    p.textContent += element.toUpperCase();
    dinoNameDisplay.append(p);
  });
}




function displayLetter(input) {
  const letter = input.toUpperCase();
  const returnedArray = document.querySelectorAll(".hidden");
  let isItThere = false;

  if(!letter.match(/^[a-z]+/gmi)) {
    return false;
  }

 
 

  //increasing guess count
  let guessAmount = Number(document.getElementById("guessAmount").innerText);
  document.getElementById("guessAmount").innerText = (guessAmount +1);


//unhiding letter if guessed correctly
  returnedArray.forEach(function(element) {
    if (element.textContent === letter) {
      document.getElementById(`${element.id}`).classList.remove("hidden");
      isItThere = true;
    }
  });

  let usedLettersArray = []
  const usedLettersDiv = document.getElementById('usedLetters');
  for (const child of usedLettersDiv.children) {
    usedLettersArray.push(child.innerText);
  }


//adding letters to the wrong guess list
  if (!isItThere && !usedLettersArray.includes(letter)) {
    let p = document.createElement("p");
    p.append(letter);
    usedLettersDiv.append(p);
  }

  checkWinner();
}

function checkWinner() {
  const returnedArray = document.querySelectorAll(".hidden");
  if (returnedArray.length === 0) {
    let div = document.createElement('div');
    div.innerText = "YOU WEEEEEENNNNNNNNN";
    document.body.append(div);
  }
}

function printError(request, response) {

}

document.getElementById('startGame').addEventListener('click', getDino);
