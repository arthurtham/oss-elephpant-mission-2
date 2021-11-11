const { isMCOptionCorrect, isTrueFalseCorrect } = require("../lib/answer_check_helper.js");

module.exports = async function (helper) {
    const {
        answer1,
        answer2,
        answer3
    } = helper.validationFields;

    if (!answer1 || !answer2 || !answer3) {
        return helper.fail(`
            Please answer all the questions before submitting!
        `);
    }

    if (!(
        isTrueFalseCorrect(answer1, true) &&
        isMCOptionCorrect(answer2,"b") &&
        isMCOptionCorrect(answer3,"a")
    )) { 
        return helper.fail(`
        Uh oh! Looks like you didn’t get it quite right. Try watching the video one more time.
        `);
    }

    return helper.success(`
    Correct! These strategies won’t eliminate all your bias but can help diminish the way they play out in your behavior. 
    `)

};
