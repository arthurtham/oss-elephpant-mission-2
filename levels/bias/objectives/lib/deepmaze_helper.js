const { isTrueFalseCorrect } = require("./answer_check_helper.js");

function processAnswer(helper, answer) {
    const worldState = helper.world.getState("com.twilioquest.Bias");

    if (!worldState.Bias.objective.hasEnoughTimePassed) {
        return helper.fail(`You're answering too fast! Pay attention to the material first, then answer the question.`);
    }
    
    const {
        answer1
    } = helper.validationFields;

    if (!isTrueFalseCorrect(answer1, answer)) {
        return helper.fail(`
        Hmm, that's not the correct answer. Re-read the question and try again!
        `)
      }

    return helper.success(`
        Nice answer! You've solved the puzzle at this story gallery station!
    `)
}

function processAnswer2(helper, canswer1, canswer2) {
    const worldState = helper.world.getState("com.twilioquest.Bias");

    if (!worldState.Bias.objective.hasEnoughTimePassed) {
        return helper.fail(`You're answering too fast! Pay attention to the material first, then answer the question.`);
    }
    
    const {
        answer1, answer2
    } = helper.validationFields;

    if (!(
        isTrueFalseCorrect(answer1, canswer1)
        && isTrueFalseCorrect(answer2, canswer2)
    )) {
        return helper.fail(`
        Hmm, that's not the correct answer. Re-read the question and try again!
        `)
      }

    return helper.success(`
        Nice answer! You've solved the puzzle at this story gallery station!
    `)
}

module.exports = {
    processAnswer,
    processAnswer2
};
