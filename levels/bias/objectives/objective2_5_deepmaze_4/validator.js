const { processAnswer2 } = require("../lib/deepmaze_helper.js");

module.exports = async function (helper) {
    const correctAnswer1 = true;
    const correctAnswer2 = true;
    return processAnswer2(helper, correctAnswer1, correctAnswer2);
};
