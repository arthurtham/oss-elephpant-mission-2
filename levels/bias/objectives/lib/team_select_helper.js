const { isMCOptionCorrect } = require("../lib/answer_check_helper");

function teamSelectHelper(helper, stationName) {
    const biasStation = helper.world.getState("com.twilioquest.Bias").Bias.biasStation;
    const { answer1 } = helper.validationFields;

    if (!answer1) {
        return helper.fail(`
        Please answer the question before continuing
        (this should never happen)
    `);
    }

    // If the player answers "no one" (always option a), then set the station flag to false
    if (isMCOptionCorrect(answer1, "a")) {
        biasStation.stationFlags[stationName] = false;
    } else { // otherwise, set the station flag to true
        biasStation.stationFlags[stationName] = true;
    }

    return helper.success(`
    Right yay you did it
  `);
}
module.exports = teamSelectHelper;