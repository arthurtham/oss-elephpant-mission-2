module.exports = async function (helper) {
    const worldState = helper.world.getState("com.twilioquest.Bias");
    const deepMaze = worldState.Bias.deepMaze;

    if (!deepMaze.hasEnoughTimePassed) {
        return helper.fail(`time fail condition`);
    }
    
    const {
        answer1
    } = helper.validationFields;

    if (answer1.length < 240) {
        return helper.fail(`
            Not long enough
        `)
    }
    helper.success(`
        "You pass"
    `)
};
