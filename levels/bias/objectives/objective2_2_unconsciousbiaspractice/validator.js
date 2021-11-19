const { isMCOptionCorrect, isTrueFalseCorrect, areLetterSelectionsValid } = require("../lib/answer_check_helper.js");

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
        areLetterSelectionsValid(answer1, "abcdef") &&
        areLetterSelectionsValid(answer2, "abc") &&
        areLetterSelectionsValid(answer3, "abcde") 
    )) {
        return helper.fail(`
        Make sure to only use letter options provided (a, b, c, ...), and 
        to not duplicate letter responses.
        `);
    }

    return helper.success(`
    Thank you for your response and for thinking deeply about the strategies outlined in the article.
    `)

};
