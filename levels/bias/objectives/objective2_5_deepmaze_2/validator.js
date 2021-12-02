const { processAnswer } = require("../lib/deepmaze_helper.js");

module.exports = async function (helper) {
    const correctAnswer = true;
    return processAnswer(helper, correctAnswer);
};
