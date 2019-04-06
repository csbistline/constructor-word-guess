// ===================================
// REQUIRED FILES AND GLOBAL VARIABLES
// ===================================
const Word = require("./word");
const Letter = require("./letter");
const fs = require("fs");
const os = require("os");
const inquirer = require("inquirer");
const chalk = require('chalk');
const maxGuess = 10;

var wordArray = [];
var wordToGuess;
var guessesLeft;
var divider = "\n================================";

// ==================================
// FUNCTIONS 
// ==================================

// constructs Word object from string
var constructWord = function (str) {
    var letterArr = [];
    for (var i = 0; i < str.length; i++) {
        var letter = new Letter(str.charAt(i));
        letterArr.push(letter);
    }
    tempWord = new Word(letterArr);
    return tempWord;
};

// read list of words from file, create array
var readWords = function () {
    // reset guesses
    guessesLeft = maxGuess;
    fs.readFile("wordlist.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };
        wordArray = data.split(os.EOL)
        var i = Math.floor(Math.random() * wordArray.length);
        var currentWord = wordArray[i];
        wordToGuess = constructWord(currentWord);
        inquire();
    }
    )
};

// prompts user for input
var inquire = function () {
    console.log(guessesLeft + " guesses remaining.");
    console.log("\n" + wordToGuess.showWord() + "\n");

    inquirer.prompt([
        {
            type: "input",
            name: "guess",
            message: "Guess a letter:",
            validate: function validateGuess(char) {
                var alphabet = /^[A-Za-z]+$/;
                var pass = (char.length === 1) && (char.match(alphabet));
                if (pass) {
                    return true;
                } else {
                    return "Please enter a single letter";
                }
            }
        }
    ]).then(function (response) {
        var char = response.guess.toLowerCase()
        if (wordToGuess.isLetter(char)) {
            console.log(chalk.green.bold(divider + "\nCORRECT!" + divider));
        }
        else {
            console.log(chalk.red.bold(divider + "\nINCORRECT!" + divider));
            guessesLeft--;
        }
        checkWinLoss();
    })
};

// checks win/loss conditions, restarts game if over
var checkWinLoss = function () {
    var counter = 0;
    var arr = wordToGuess.wordToGuess;

    // win condition (guessesLeft > 0)
    if (guessesLeft > 0) {
        // check win condition
        // loop the letters in the word and see if all have been guessed
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].guessed) {
                counter++
            }
        }
        console.log(counter + " letters guessed out of " + arr.length);
        /// if they have, you won, restart the round
        if (counter === arr.length) {
            console.log(chalk.green.bold("\n" + wordToGuess.showWord()));
            console.log(chalk.green.bold(divider + "\nYou got it! Next word:" + divider));
            readWords();
        } else {
            inquire();
        }
    } else {
        // set all guessed values to true and reveal the word
        for (var i = 0; i < arr.length; i++) {
            arr[i].guessed = true;
        };
        console.log(chalk.red.bold("\n" + wordToGuess.showWord()));
        console.log(chalk.red.bold(divider + "\nYou lost, try again! Next word:" + divider));
        readWords();
    }
};

// ==================================
// INITIALIZATION 
// ==================================
readWords();

