/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1, answer2, answer3 } = helper.validationFields;

  // Next, you test the user input - fail fast if they get one of the
  // answers wrong, or some aspect is wrong! Don't provide too much
  // negative feedback at once, have the player iterate.
  if (!answer1 || !answer2 || !answer3) {
    return helper.fail(`
      Please answer all three questions before submitting your answer. Try scrolling
      down on the questions panel if you don't see all the questions!
    `);
  }

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    <p>The original caption reads:</p>

    <p><blockquote>Chen Kecai, left and Jin Songhao, wearing shorts and sanding in containers filled with ice on Tianmen Mountain in Zhangjiajie, China, 
    competed for the record in enduring the cold. Mr. Jin, with 120 minutes, outscored Mr. Chen’s 118 minutes. 
    On March 14, 2010 Mr. Chen set the record for the longest time spent in direct full body contact with ice: 1 hour 48 minutes 21 seconds.</blockquote></p>

    <p>What was different and similar between the original caption of the image and your analysis of the image? Notice these differences and explore what might have been driving your interpretations.</p>
  `);
};
