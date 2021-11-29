const { isMCOptionCorrect } = require("../lib/answer_check_helper.js");

module.exports = async function (helper) {
  const biasStation = helper.world.getState("com.twilioquest.Bias").Bias.biasStation;

  const { answer1 } = helper.validationFields;

  if (!answer1) {
    return helper.fail(`
      Please answer question (we should never see this failure tbh)
    `);
  }

  // If the player answers "no one", then set the station flag to false
  if (isMCOptionCorrect(answer1, "d")) {
    biasStation["teammate_select_astrophysicist"] = false;
  } else { // otherwise, set the station flag to true
    biasStation["teammate_select_astrophysicist"] = true;
  }

  helper.success(`
    Right yay you did it
  `);
};
