const { isMCOptionCorrect, isTrueFalseCorrect } = require("../lib/answer_check_helper.js");

module.exports = async function (helper) {
    const {
        answer1,
        answer2,
        answer3,
        answer4
    } = helper.validationFields;

    if (!answer1 || !answer2 || !answer3 || !answer4) {
        return helper.fail(`
            Please answer all the questions before submitting!
        `);
    }

    if (!(
        isTrueFalseCorrect(answer1, true) &&
        isTrueFalseCorrect(answer2, true) &&
        isTrueFalseCorrect(answer3, true) &&
        isTrueFalseCorrect(answer4, true)
    )) { 
        return helper.fail(`
        This is incorrect. Try watching the video one more time and answering again.
        `);
    }

    return helper.success(`
    Correct! Inclusion is all those things and more. What does inclusion look like to you?  
    `)

};
