function isMCOptionValid(playerAnswer = '') {
    if (playerAnswer.length != 1) {
        return false;
    }
    return true;
}

function isMCOptionCorrect(playerAnswer = '', correctAnswer = '') {
    playerAnswer = playerAnswer.trim().substr(0,1).normalize().toLowerCase();
    return playerAnswer === correctAnswer.toLowerCase();
  }

function isTrueFalseCorrect(playerAnswer = '', correctAnswer = true) {
    assert (correctAnswer === true || correctAnswer === false);
    assert (playerAnswer === "true" || playerAnswer === "false");
    return correctAnswer === (playerAnswer === "true" ? true : false);
}
  
module.exports = {
    isMCOptionValid,
    isMCOptionCorrect,
    isTrueFalseCorrect
};
  