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
        Please select a valid team member by using its corresponding letter!
    `);
    }

    if (!areLetterSelectionsValid(answer1, "abcdef")) {
        return helper.fail(`
        Please select a valid team member by using its corresponding letter!
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

    const roles = {
        astrophysicist: "astrophysicist",
        biochemist: "biochemist",
        datascientist: "data scientist",
        medicaldoctor: "medical doctor",
        xenobiologist: "xenobiologist"
    }

    return helper.success(`
    You have selected <strong>`
    +(answer1 === "a" ? "no one" : biasTeamObject[roleName][answer1].name)
    +`</strong> as your <strong>`+roles[roleName]+`</strong>!
  `);
}
module.exports = teamSelectHelper;