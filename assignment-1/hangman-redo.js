
function Hangman() {
  this.word = (Hangman.prototype.wordBank[Math.floor(Math.random() * Hangman.prototype.wordBank.length)]).split("");
  this.guess = [],
  this.wordSoFar = [],
  this.mulFlag = false,
  this.numGuess = 0
}
Hangman.prototype.wordBank = ['baseball', 'dictionary', 'combination', 'lavender', 'strawberry', 'watermelon', 'manhattan', 'transportation', 'capital', 'computer', 'science', 'digital', 'minute', 'second', 'planet', 'system'];
Hangman.prototype.lost = "=====||\n  |  ||\n  O  ||\n \\|/ ||\n  |  ||\n / \\ ||\n=====||";

// changed regular function to fat arrow function
Hangman.prototype.guessLetter = function(letter) {

  if (typeof letter !== 'string' || letter.length !== 1) {
    console.log('You did not enter the correct input');
    return;
  }

  for (var i = 0; i < this.guess.length; i++) {
    if (letter === this.guess[i]) {
      console.log("You already guessed that letter");
      return;
    }
  }

  for (var i = 0; i < this.word.length; i++) {

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

  console.log('\nGuesses: ' + this.guess.join(','));
  console.log("\nWord: " + this.wordSoFar.join(' '));
  if (this.wordSoFar.join() === this.word.join()) {
    console.log('\nYou won!');
  }
  if (this.numGuess === 8) {
    console.log(Hangman.prototype.lost);
    console.log('\nYou lost');
    return;
  }
}
