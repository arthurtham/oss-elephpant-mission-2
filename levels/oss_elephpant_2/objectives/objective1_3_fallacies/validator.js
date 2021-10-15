
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

module.exports = async function (helper) {
  // Validator 1: All question blocks must have some sort of answer in them
  if (!answer1) {
    return helper.fail(`
      Please answer all three questions before submitting your answer. Try scrolling
      down on the questions panel if you don't see all the questions!
    `);
  }
  helper.success(`
    Great work! How'd you do?
  `);
};
