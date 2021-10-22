// This is an example of how you might use objective validation helpers
// in your own code. You don't have to, but you'll often want to!
function isMCOptionCorrect(playerAnswer = '', correctAnswer = '') {
    if (playerAnswer.length > 1) {
        return false;
    }
    playerAnswer = playerAnswer.substr(0,1).normalize().toLowerCase();
    return playerAnswer === correctAnswer.toLowerCase();
  }
  
module.exports = {
    isMCOptionCorrect
};
  