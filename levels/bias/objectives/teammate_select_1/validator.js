const assert = require("assert");
const R = require("ramda");

module.exports = async function (helper) {
  const { answer1 } = helper.validationFields;

  if (!answer1) {
    return helper.fail(`
      Wrong
    `);
  }

  helper.success(`
    Right
  `);
};
