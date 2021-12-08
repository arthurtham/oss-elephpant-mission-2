const keywordsHelper = require("../lib/keywords_helper");

module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.CriticalThinking");
  let captionState = worldState.CriticalThinking.conversations.ele.objective1_4_mcd_post;
  const { answer1, answer2, answer3} = helper.validationFields;


  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all questions before submitting.
    `);
  }

  var library = [
    "burn", "hot", "700", "frivilous", "top", 
    "180", "190", "hot", "third-degree", "fair",
    "lies", "media", "coverage", "silly"
  ];

  // Focus more on answer 2 
  var answer = (answer1 + " " + answer2 + " " + answer3);
  captionState = keywordsHelper(answer, library, captionState,
    "We identified some words in your response that are important regarding the case",
    "Looks like you didn't find any of the things that are important for this case.",
    "Seems like you didn't identify some important key words about the case",
    "Woah! You are spot on for your analysis.");

  worldState.CriticalThinking.conversations.ele.objective1_4_mcd_post = captionState;
  helper.world.setState('com.twilioquest.CriticalThinking', worldState);

  helper.success(`
    Nice thinking! Better remember those thoughts for a future objective...
  `);
};
