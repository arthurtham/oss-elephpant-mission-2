const { isMCOptionCorrect } = require("../lib/fallacies_final_helper");

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
        isMCOptionCorrect(answer2,"a") &&
        answer3 === "true" &&
        isMCOptionCorrect(answer4,"b") &&
        answer5 === "false"
    )) {
        return helper.fail(`
            One of your answers is incorrect! Please double check
            your answers and try again. Use the "HELP" tab
            if you need further resources!
        `);
    }

    return helper.success(`
        You did it! You passed the fallacy challenge!
    `)

};
