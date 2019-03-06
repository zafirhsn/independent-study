
// Turn function constructor into ES6 classes syntax
class Hangman {
  constructor() {
    this.word = (Hangman.prototype.wordBank[Math.floor(Math.random() * Hangman.prototype.wordBank.length)]).split("");
    this.guess = [],
    this.wordSoFar = [],
    this.mulFlag = false,
    this.numGuess = 0
  }
}

Hangman.prototype.wordBank = ['baseball', 'dictionary', 'combination', 'lavender', 'strawberry', 'watermelon', 'manhattan', 'transportation', 'capital', 'computer', 'science', 'digital', 'minute', 'second', 'planet', 'system'];
Hangman.prototype.lost = "=====||\n  |  ||\n  O  ||\n \\|/ ||\n  |  ||\n / \\ ||\n=====||";

// Was going to change this function to fat arrow function, but 'this' keyword in fat arrow function is scoped differently than regular function, so it would not work in this case because it would look above the function for definition of 'this' keyword. 
Hangman.prototype.guessLetter = function(letter) {

  if (typeof letter !== 'string' || letter.length !== 1) {
    console.log('You did not enter the correct input');
    return;
  }

// Changed regular for loop to for...of
  for (let i of this.guess) {
    if (letter === i) {
      console.log("You already guessed that letter");
      return;
    }
  }

// This for loop will stay as a regular for loop because I use the index of the letter in the logic. A for...in loop would work but then the index is actually of type string, which means I'd have to convert it back to an int to use it, which makes it more work than a regular for loop
  for (let i = 0; i < this.word.length; i++) {

    if (letter === this.word[i]) {
      this.mulFlag = true;
      this.wordSoFar[i] = this.word[i];
    }
    else {

      if (typeof this.wordSoFar[i] !== 'string') {
        this.wordSoFar[i] = '_';
      }
    }
  }
  this.guess.push(letter);

  if (!this.mulFlag) {
    console.log("Nope");
    this.numGuess++;
  }

  else {
    this.mulFlag = false;
    console.log('You guessed correct!');
  }


// Changed concatenating strings to template literals
  console.log(`\nGuesses: ${this.guess.join(',')}`);
  console.log(`\nWord: ${this.wordSoFar.join(' ')}`);
  if (this.wordSoFar.join() === this.word.join()) {
    console.log('\nYou won!');
  }
  if (this.numGuess === 8) {
    console.log(Hangman.prototype.lost);
    console.log('\nYou lost');
    return;
  }
}
