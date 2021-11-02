const assert = require("assert");
const R = require("ramda");
const { isTrueFalseCorrect } = require("../lib/answer_check_helper.js");

module.exports = async function (helper) {
  const { answer1, answer2, answer3 } = helper.validationFields;

  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all questions before submitting your answer. Try scrolling
      down on the questions panel if you don't see all the questions!
    `);
  }

  // Validator 2: is the first answer correct? (true)
  if (!isTrueFalseCorrect(answer1, true)) {
    return helper.fail(`
    Try watching the video again and answer one more time.
    `)
  }
  // 

  helper.success(`
    Correct! Yes, it’s true: if you have a brain, then you have a bias!
    `);
};
