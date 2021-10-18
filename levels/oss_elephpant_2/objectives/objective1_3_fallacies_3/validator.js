const { processAnswer } = require("../lib/fallacies_helper");

module.exports = async function (helper) {
    const correctAnswer = "d";
    return processAnswer(helper, correctAnswer);
};
