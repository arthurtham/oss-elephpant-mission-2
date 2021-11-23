const assert = require("assert");
const { exit } = require("process");

function isMCOptionValid(playerAnswer = '') {
    if (playerAnswer.length != 1) {
        return false;
    }
    return true;
}

/**
 * Check if the playerAnswer matches the correctAnswer. The answer must be a single alphabet character.
 * @param {*} playerAnswer 
 * @param {*} correctAnswer 
 * @returns true if the answer is correct, and false otherwise.
 */
function isMCOptionCorrect(playerAnswer = '', correctAnswer = '') {
    playerAnswer = playerAnswer.trim().substr(0,1).normalize().toLowerCase();
    return playerAnswer === correctAnswer.toLowerCase();
  }

/**
 * Check if the playerAnswer is the string form of "true" or "false", then properly
 * compares the booleans of playerAnswer to correctAnswer 
 * @param {*} playerAnswer 
 * @param {*} correctAnswer 
 * @returns true if the boolean answer is correct, and false otherwise.
 */
function isTrueFalseCorrect(playerAnswer = '', correctAnswer = true) {
    if ((playerAnswer === null) || (correctAnswer === null)) {
        console.log("Player Answer or Correct Answer is invalid.");
        return false;
    }
    assert (correctAnswer === true || correctAnswer === false);
    assert (playerAnswer === "true" || playerAnswer === "false");
    return correctAnswer === (playerAnswer === "true" ? true : false);
}

/**
 * Check if the playerAnswer is in the possibleAnswers. The playerAnswer
 * and possibleAnswers must be a series of characters. For each character
 * in playerAnswer, if it is not in possibleAnswers, return false. Otherwise,
 * if all characters in playerAnswer is valid, return true.
 * @param {*} playerAnswer 
 * @param {*} possibleAnswers 
 * @returns true or false as described in the function description.
 */
function areLetterSelectionsValid(playerAnswer = '', possibleAnswers = '') {
    if (!playerAnswer || !possibleAnswers) {
        return false;
    }
    var legalChar = false; // Flag to make sure there is at least one valid character
    var answeredCharacters = "";
    for (var character of playerAnswer) {
        character = character.toLowerCase();
        if (character === "," || character === " ") {
            // Do nothing with commas; aka, allow players to
            // input as "a, b, c"
        } else if (!possibleAnswers.includes(character) || answeredCharacters.includes(character)) {
            return false;
        } else {
            legalChar = true;
            answeredCharacters = answeredCharacters.concat("", character);
        }
    };
    return legalChar;
}
  
module.exports = {
    isMCOptionValid,
    isMCOptionCorrect,
    isTrueFalseCorrect,
    areLetterSelectionsValid
};
  