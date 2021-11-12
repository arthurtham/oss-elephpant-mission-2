module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.Bias");
  const deepMaze = worldState.Bias.deepMaze;

  // Validator 1: Are enough stations solved?
  if (!deepMaze.canPass) {
    return helper.fail(`
    Please visit at least 4 deepening understanding stations and hack them before hacking this station.
    `);
  }

  helper.success(`
    Alright! You've solved the deepening understanding gallery challenge!
  `);
};
