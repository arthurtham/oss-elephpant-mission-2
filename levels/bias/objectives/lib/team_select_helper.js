const { isMCOptionCorrect, isMCOptionValid, areLetterSelectionsValid } = require("../lib/answer_check_helper");

function teamSelectHelper(helper, stationName) {
    const bias = helper.world.getState("com.twilioquest.Bias").Bias;
    const biasStation = bias.biasStation;
    const biasTeamObject = bias.biasStation.team;
    const { answer1 } = helper.validationFields;
    
    //TODO: How many possible team members are there? We must fail if the player does not
    //      enter a valid team member.

    if (!answer1) {
        return helper.fail(`
        Please answer the question before continuing
        (this should never happen)
    `);
    }

    if (!areLetterSelectionsValid(answer1, "abcdef")) {
        return helper.fail(`
        INVALID LETTER TRY AGAIN >:(
        `)
    }

    // If the player answers "no one" (always option a), then set the station flag to false
    if (isMCOptionCorrect(answer1, "a")) {
        biasStation.stationFlags[stationName] = false;
    } else { // otherwise, set the station flag to true
        biasStation.stationFlags[stationName] = true;
    }
    let roleName = stationName.replace("teammate_select_","");
    biasTeamObject[roleName].selected = answer1;

    return helper.success(`
    Right yay you did it
  `);
}
module.exports = teamSelectHelper;