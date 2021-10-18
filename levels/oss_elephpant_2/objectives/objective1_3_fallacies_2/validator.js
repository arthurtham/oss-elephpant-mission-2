const { processAnswer } = require("../lib/fallacies_helper");

module.exports = async function (helper) {
    const correctAnswer = "b";
    return processAnswer(helper, correctAnswer);
};
