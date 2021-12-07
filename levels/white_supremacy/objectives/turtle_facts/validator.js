module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1, answer2, answer3 } = helper.validationFields;

  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all three questions before submitting your answer. Try scrolling
      down on the questions panel if you don't see all the questions!
    `);
  }

  helper.success(`
    Alright congrats, I now know more about my turtle than I could ever know. :)
  `);
};
