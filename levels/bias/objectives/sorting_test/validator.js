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
        isMCOptionCorrect(answer1,"c") &&
        isMCOptionCorrect(answer2,"b") &&
        isTrueFalseCorrect(answer3, true) &&
        isMCOptionCorrect(answer4,"b") &&
        isMCOptionCorrect(answer5,"a")
    )) {
        return helper.fail(`
        Uh oh! Looks like you missed something. Watch the videos again and try answering one more time. 
        `+answer1+answer2+answer3+answer4+answer5+`
        `);
    }

    return helper.success(`
    Great job! You are on your way to learn more about how these biases can impact you and the people around you.
    `)

};
