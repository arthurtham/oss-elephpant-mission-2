
const assert = require("assert");
const keywordsHelper = require("../lib/keywords_helper");

module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.CriticalThinking");
  let captionState = worldState.CriticalThinking.conversations.ele.objective1_1_photo_post;
  const { answer1, answer2, answer3 } = helper.validationFields;

  const library = [
    "wires", "ice", "snow",
    "white", "blue","orange",
    "glasses","chunks","blocks",
    "bag","cold","television",
    "tv","monitor","microphone",
    "people","crew","container",
    "box","clear","window",
    "glass","barrier","crew",
    "contestant","kanji","chinese"
  ];

  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all three questions before submitting your answer. Try scrolling
      down on the questions panel if you don't see all the questions!
    `);
  }

  var answer = (answer1 + " " + answer2 + " " + answer3);

  captionState = keywordsHelper(answer, library, captionState,
    "Here are the words that we identified in your response",
    "It looks like you didn't find any of the things in the picture that we identified.",
    "Here are things that we identified that you may not have noticed",
    "It looks like you found all of the things in the picture that we identified!");
  
  worldState.CriticalThinking.conversations.ele.objective1_1_photo_post = captionState;
  helper.world.setState('com.twilioquest.CriticalThinking', worldState);

  helper.success(`
    Nice thoughts! Ele thinks you're worthy of being a critical thinker.
  `);
};
