// LETTER.JS - Letter constructor

var Letter = function(character) {
    this.character = character;
    this.guessed = false;
    this.toString = function() {
        if (this.guessed) {
            return this.character;
        } else {
            return "_";
        }
    };
    this.isGuessed = function(char){
        if (this.character === char) {
            this.guessed = true;            
            return true;
        } 
        else {
            return false;
        }
    };
};

// var myLetter = new Letter("a");
// console.log(myLetter);
// console.log(myLetter + "");
// myLetter.guessed = true;
// console.log(myLetter + "");

// Export Letter constructor
module.exports = Letter;

