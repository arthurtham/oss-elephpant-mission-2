const { isMCOptionCorrect, isTrueFalseCorrect } = require("../lib/answer_check_helper.js");

module.exports = async function (helper) {
    const {
        answer1,
        answer2,
        answer3,
        answer4,
        answer5
    } = helper.validationFields;

    if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5) {
        return helper.fail(`
            Please answer all the questions before submitting!
        `);
    }

    if (!(
        isTrueFalseCorrect(answer1, true) &&
        isTrueFalseCorrect(answer2, false) &&
        isTrueFalseCorrect(answer3, true) &&
        isTrueFalseCorrect(answer4, false)
    )) {
        return helper.fail(`
        Uh oh! Looks like you didn’t get it quite right. Try watching the videos one more time.
        `);
    }

    return helper.success(`
    Correct! Bias can be a sneaky little bugger. It’s great that you are embarking on this learning to be able to better recognize and identify it.
    `)

};
