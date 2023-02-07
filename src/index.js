import Keyboard from 'simple-keyboard';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'simple-keyboard/build/css/index.css';
import './css/styles.css';

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

function displayLetter() {
  const letter = document.getElementById("letterGuess").value.toUpperCase();
  const returnedArray = document.querySelectorAll(".hidden");
  document.getElementById("guess").reset();
  let isItThere = false;
  if(letter) {
    let guessAmount = Number(document.getElementById("guessAmount").innerText);
    document.getElementById("guessAmount").innerText = (guessAmount +1);
  }
  returnedArray.forEach(function(element) {
    if (element.textContent === letter) {
      document.getElementById(`${element.id}`).classList.remove("hidden");
      isItThere = true;
    }
  });
  if (!isItThere) {
    let p = document.createElement("p");
    let div = document.getElementById("usedLetters");
    p.append(letter);
    div.append(p);
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

/*
reach goals:
maybeee add keyboard?
*/

function printError(request, response) {

}

document.getElementById('startGame').addEventListener('click', getDino);
document.getElementById("submit").addEventListener("click", displayLetter);
