
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1, answer2, answer3} = helper.validationFields;

  // Next, you test the user input - fail fast if they get one of the
  // answers wrong, or some aspect is wrong! Don't provide too much
  // negative feedback at once, have the player iterate.

  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all questions before submitting.
    `);
  }

  // 

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!

  helper.success(`
    Nice thinking! Better remember those thoughts for a future objective...
  `);
};
