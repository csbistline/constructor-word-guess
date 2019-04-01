var Letter = require("./letter")

var Word = function (arr) {
    this.wordToGuess = arr;
    this.toString = function () {
        var word = "";
        for (var i = 0; i < this.wordToGuess.length; i++) {
            var letter = this.wordToGuess[i];
            word += letter.toString();
        }
        return word;
    };
    this.isLetter = function (char) {
        for (var i = 0; i < this.wordToGuess.length; i++) {
            var letter = this.wordToGuess[i];
            var inWord = letter.isGuessed(char);
        }
        return inWord
    }
}

// write a word constructor function ... probably in index ... and pass array to Word
var constructWord = function (str) {
    var wordToGuess = [];
    for (var i = 0; i < str.length; i++) {
        var letter = new Letter(str.charAt(i));
        wordToGuess.push(letter);
    }
    return wordToGuess;
};


var myWordLetters = constructWord("hello");
var myWord = new Word(myWordLetters);
console.log(myWord.toString());
myWord.isLetter("l");
console.log("Guessing a letter: 'l'");
console.log(myWord.toString());




