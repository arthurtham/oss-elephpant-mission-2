module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.Bias");

  // Validator 1: Are enough stations solved?
  if (true) {
    return helper.fail(`
    Please visit the ....
    `);
  }

  helper.success(`
    Alright! You did it!
  `);
};