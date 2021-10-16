
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.osselephpant2");
  const fallacies = worldState.ossElephpant2.fallacies;
  const {
    answer1
  } = helper.validationFields;

  // Validator 1: Are enough stations solved?
  if (!fallacies.canPass) {
    return helper.fail(`
    Please visit at least 3 fallacy stations before hacking this station.
    `);
  }


  // Validator 2: All question blocks must have some sort of answer in them
  if (!answer1) {
    return helper.fail(`
      Please answer all questions before continuing!
    `);
  }
  helper.success(`
    Great work! How'd you do?
  `);
};
