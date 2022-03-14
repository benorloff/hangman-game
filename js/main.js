/*----- constants -----*/
const WORDS = [
  "DEVELOPER",
  "ENGINEER",
  "NODE",
  "JAVASCRIPT",
  "CODING",
  "HTML",
  "GUI",
  "BOOLEAN",
  "REACT",
  "FUNCTION",
  "COMPUTER SCIENCE",
  "SEPARATION OF CONCERNS",
];
const WRONG_GUESS_HUNG_COUNT = 6;
const SPRITE_WIDTH = 15;

// Define the state
// We will set values in our init function

let secretWord; // random word from WORDS
let guessWord; // what letters are right, and what position they are in the word
let wrongLetters; // array of strings

// Set the elements on the DOM that we'll have to update

const guessEl = document.querySelector('#guess');
const letterBtns = document.querySelectorAll('#letters > button');
const msgEl = document.querySelector('#msg');
const gallowsEl = document.querySelector('#gallows');
const replayBtn = document.querySelector('#replay');

// Set up event listeners

document.querySelector('#letters').addEventListener('click', handleClick)

replayBtn.addEventListener('click', init)

function init(e) {
  console.log('init function is working')
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)]
  console.log(secretWord);

  // initialize empty string, then build a representation of the selected word
  guessWord = '';

  for (let char of secretWord) {
    guessWord += char === " " ? " " : "_";
  }

  wrongLetters = [];
  render();
}

// Take the state variables, represent them on the DOM
function render() {
  // Show the guess word on the DOM
  guessEl.innerText = guessWord;
}

function handleClick(e) {
  if (e.target.tagName === 'BUTTON') {
    if(secretWord.includes(e.target.innerText)) {
      console.log('char is in secret word');
  
      //Update our guessWord at the location of the letter
      let newGuessWord = '';
  
      // Loop over the secretWord and find location of char
      for (i = 0; i < secretWord.length; i++) {
        if(secretWord.charAt(i) === e.target.innerText) {
          newGuessWord += e.target.innerText;
        } else {
          // Include the '_' or ' ' if the button clicked does not match
          newGuessWord += guessWord.charAt(i);
        }
      }
  
      guessWord = newGuessWord;
    }
    console.log(e.target.innerText);
    render();
  }
}