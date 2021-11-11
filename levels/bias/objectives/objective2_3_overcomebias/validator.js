module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.Bias");

  if (!worldState.Bias.objective.hasEnoughTimePassed) {
      return helper.fail(`Did you watch the video? Make sure you watch the video for a while to really understand its topics.`);
  }
  
  const {
      answer1, answer2, answer3
  } = helper.validationFields;

  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Make sure to answer all the questions before submitting.
    `)
  }
  helper.success(`
      Thanks for your thoughts!
  `)
};
