// ===================================
// REQUIRED FILES AND GLOBAL VARIABLES
// ===================================
var Letter = require("./letter");

// WORD.JS - Word constructor
var Word = function (arr) {
    this.wordToGuess = arr;
    this.showWord = function () {
        var word = "";
        for (var i = 0; i < this.wordToGuess.length; i++) {
            var letter = this.wordToGuess[i];
            word += letter.toString();
        };
        return word;
    };
    this.isLetter = function (char) {
        var inWord = 0;
        for (var i = 0; i < this.wordToGuess.length; i++) {
            var letter = this.wordToGuess[i];
            if(letter.isGuessed(char)) {
                inWord++;
            };
        };
        return inWord;
    }
};

// Export Word constructor
module.exports = Word;


