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

init();

function renderMessage(numOfGuesses, winner, loser){
  
  if(winner){
    return 'Congrats you won!'
  } else if (loser) {
    return 'Uh oh, the hangman is dead. Try again.'
  }

  const msg = numOfGuesses === 1 ? `You have ${numOfGuesses} wrong guess` : `You have ${numOfGuesses} wrong guesses`

  return msg
}

function checkWinner(){
  if(guessWord === secretWord){
    return true
  } else {
    return false
  }
}

// function checkLoser() {
//   if (wrongLetters.length === WRONG_GUESS_HUNG_COUNT) {
//     return true;
//   } else {
//     return false;
//   }
// }

function init(e) {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)]
  console.log(secretWord);

  // remove button classes from previous game
  letterBtns.forEach(node => {
    node.classList.remove('wrong-letter', 'valid-letter');
  });

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
  // Update the view representing the wrong letters
  gallowsEl.style.backgroundPositionX = `-${SPRITE_WIDTH * wrongLetters.length}vmin`
  msgEl.innerText = renderMessage(wrongLetters.length, checkWinner());
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
          e.target.classList.add('valid-letter');
        } else {
          // Include the '_' or ' ' if the button clicked does not match
          newGuessWord += guessWord.charAt(i);
        }
      }
  
      guessWord = newGuessWord;
    } else {
      console.log('char is NOT in secret word');
      e.target.classList.add('wrong-letter');
      // Add letter to wrongLetters array
      wrongLetters.push(e.target.innerText);
      msgEl.innerText = `You have ${wrongLetters.length} wrong guess${wrongLetters.length > 1 ? 'es' : ''}.`
    }
    console.log(e.target.innerText);
    render();
  }
}