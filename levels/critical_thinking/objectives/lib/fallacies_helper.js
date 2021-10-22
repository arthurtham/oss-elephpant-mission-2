// This is an example of how you might use objective validation helpers
// in your own code. You don't have to, but you'll often want to!
function isAnswerCorrect(playerAnswer = '', correctAnswer = '') {
    playerAnswer = playerAnswer.substr(0,1).normalize().toLowerCase();
    return playerAnswer === correctAnswer.toLowerCase();
  }

function processAnswer(helper, providedCorrectAnswer) {
    const { answer1 } = helper.validationFields;

    // Define answer letter here
    const correctAnswer = providedCorrectAnswer;

    //Validation 1: just make sure they answer
    if (!answer1) {
        return helper.fail(`
        Please answer the question before submitting your answer!
        `)
    }

    //Validation 2: make sure its only one letter
    if (answer1.length > 1) {
        return helper.fail(`
        Please only enter a letter (a, b, c, d, e) when providing your multiple choice answer.
        `)
    }

    //Validation 3: is the multiple choice answer correct
    if (!isAnswerCorrect(answer1, correctAnswer)) {
        return helper.fail(`
        Hmm, that's not the correct answer. Re-read the question and try again!
        `)
    }

    helper.success(`
        Nice answer! You've solved the puzzle at this fallacy station!
    `);
}
  
module.exports = {
    processAnswer
};
  