module.exports = async function (helper) {
    const worldState = helper.world.getState("com.twilioquest.Bias");
    const deepMaze = worldState.Bias.deepMaze;

    if (!deepMaze.hasEnoughTimePassed) {
        return helper.fail(`Did you watch the video? Make sure you watch the video for a while to really understand its topics.`);
    }
    
    const {
        answer1
    } = helper.validationFields;

    if (answer1.length < 100) {
        return helper.fail(`
            Try to write more and express your thoughts on the topic in the video.
        `)
    }
    helper.success(`
        "Thanks for your thoughts!"
    `)
};
