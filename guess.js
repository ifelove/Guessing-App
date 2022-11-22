const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset");
const typingInput = document.querySelector(".typing-input");
const hintText = document.querySelector(".hint span");
const wrongLetter = document.querySelector(".wrong-letter span");
const guessLeft = document.querySelector(".guess-left span");

let correct = [],
  incorrect = [];
let word, maxGuess;
function randomWord() {
  let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(randomObj);
  word = randomObj.word;
  console.log(word);
  maxGuess = 8;
  correct = [];
  incorrect = [];
  hintText.innerText = randomObj.hint;
  guessLeft.innerText = maxGuess;
  wrongLetter.innerText = incorrect;

  let html = "";

  word.split("").forEach(() => {
    html += `<input type="text" disabled >`;
  });
  /*
for( let i=0;i< word.length;i++){
    html=`<input type="text" disabled >`

}
*/

  inputs.innerHTML = html;
}

randomWord();

resetBtn.addEventListener("click", randomWord);
document.addEventListener("keydown", () => {
  typingInput.focus();
});
typingInput.addEventListener("input", InitGame);

function InitGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrect.includes(` ${key}`) &&
    !correct.includes(` ${key}`)
  ) {
    //for(let i=0;i<word.lenght;i++)
    //if(word[i]===key)
    if (word.includes(key)) {
      word.split("").forEach((letter, index) => {
        if (letter === key) {
          correct.push(key);
          inputs.querySelectorAll("input")[index].value = key;
          //{inputs.querySelectorAll("input")[index].value=key
        }
      });
    } else {
      maxGuess--;
      incorrect.push(` ${key}`);
    }
    wrongLetter.innerText = incorrect;
    guessLeft.innerText = maxGuess;
  }

  typingInput.value = "";
  if (correct.length === word.length) {
    alert(`Congrats You won,${word.toUpperCase()} is correct`);
    randomWord();
  } else if (maxGuess < 0) {
    alert("Game over,You av no guess");
    word.split("").forEach((letter, index) => {
      inputs.querySelectorAll("input")[index].value = letter;
    });
  }
}
