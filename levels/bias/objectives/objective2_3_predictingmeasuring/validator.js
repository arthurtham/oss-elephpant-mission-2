const assert = require("assert");
const R = require("ramda");

module.exports = async function (helper) {
  const { answer1, answer2, answer3 } = helper.validationFields;

  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all questions before submitting your answer. Try scrolling
      down on the questions panel if you don't see all the questions!
    `);
  }

  // Validator 2: is the first answer yes or no? 
  if (
    !("yes no".includes(answer1))
    ) {
    return helper.fail(`
    Please put "yes" or "no" for the first answer.
    `)
  }
  // 

  helper.success(`
    You did it!
    `);
};
