const keywordsHelper = require("../lib/keywords_helper");

module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.CriticalThinking");
  let captionState = worldState.CriticalThinking.conversations.ele.objective1_4_worstauntever_post;
  const { answer1 } = helper.validationFields;

  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1) {
    return helper.fail(`
      Please answer the question before submitting your answer.
    `);
  }

  var library = [];
  captionState = keywordsHelper(answer1, library, captionState,
    "words we identified in your response",
    "no words identified in your response.",
    "you didn't notice",
    "you noticed all words.");

  worldState.CriticalThinking.conversations.ele.objective1_4_worstauntever_post = captionState;
  helper.world.setState('com.twilioquest.CriticalThinking', worldState);

  helper.success(`
    Nice thinking! Better remember those thoughts for a future objective...
  `);
};
