module.exports = async function (helper) {

  const { answer1 } = helper.validationFields;

  //Temporary: just make sure they answer
  if (!answer1) {
    helper.fail(`
      Please answer the question before submitting your answer!
    `)
  }

  helper.success(`
    Great work!
  `);
};
