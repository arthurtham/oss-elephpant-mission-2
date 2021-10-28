module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.CriticalThinking");
  const fallacies = worldState.CriticalThinking.fallacies;

  // Validator 1: Are enough stations solved?
  if (!fallacies.canPass) {
    return helper.fail(`
    Please visit at least 3 fallacy stations and hack them before hacking this station.
    `);
  }

  helper.success(`
    Alright! You've solved the logical fallacy gallery challenge!
  `);
};
