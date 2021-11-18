const { isMCOptionCorrect, isTrueFalseCorrect } = require("../lib/answer_check_helper.js");

module.exports = async function (helper) {
    const {
        answer1
    } = helper.validationFields;

    if (!answer1) {
        return helper.fail(`
            Please answer all the questions before submitting!
        `);
    }

    if (!(
        isMCOptionCorrect(answer1, "a")
    )) {
        return helper.fail(`
        Oh no! Looks like you didn’t get it quite right this time around. Try again.
        `);
    }

    return helper.success(`
    Correct! It’s true, setting up objective criteria around decision making processes can help to minimize bias.
    `)

};
