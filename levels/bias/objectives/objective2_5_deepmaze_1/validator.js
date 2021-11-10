const { processAnswer } = require("../lib/fallacies_helper");

module.exports = async function (helper) {
    const correctAnswer = "a";
    return processAnswer(helper, correctAnswer);
};
