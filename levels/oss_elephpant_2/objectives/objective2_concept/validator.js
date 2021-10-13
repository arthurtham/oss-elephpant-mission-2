const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { 
    criticalNot1,
    criticalNot2,
    criticalNot3, 
    criticalNot4,
    criticalNot5,
    criticalNot6,
    criticalNot7,
    criticalIs1,
    criticalIs2,
    criticalIs3,
    criticalIs4,
    criticalIs5,
    criticalIs6,
    criticalIs7
   } = helper.validationFields;

  //All fields need to be answered
  
  if (
    criticalNot1 === undefined ||
    criticalNot2 === undefined ||
    criticalNot3 === undefined ||
    criticalNot4 === undefined ||
    criticalNot5 === undefined ||
    criticalNot6 === undefined ||
    criticalNot7 === undefined ||
    criticalIs1 === undefined ||
    criticalIs2 === undefined ||
    criticalIs2 === undefined ||
    criticalIs3 === undefined ||
    criticalIs4 === undefined ||
    criticalIs5 === undefined ||
    criticalIs6 === undefined ||
    criticalIs7 === undefined 
  ) {
    return helper.fail(`Please answer all the questions!`);
  }
  
  if (criticalIs1 === "false" || 
  criticalIs2 === "false" || 
  criticalIs3 === "false"|| 
  criticalNot1 === "true" || 
  criticalNot2 === "true") {
      return helper.fail(`
        Oops! Looks like you have a mistake there. 
        Think about your answers about other people's thinking and try again!
        `+criticalIs1+criticalIs2+criticalIs3+criticalNot1+criticalNot2+`
        `);
  }

  if (
    criticalIs4 === "false" ||
    criticalIs5 === "false" ||
    criticalNot6 === "true" ||
    criticalNot7 === "true"
     ) {
    return helper.fail(`
      Oops! Looks like you have a mistake there. 
      Think about your answers about your own thinking and try again!
    `);
  }

  if (
    criticalIs6  === "false" ||
    criticalIs7  === "false" ||
    criticalNot3  === "true" ||
    criticalNot4  === "true" ||
    criticalNot5  === "true" ) {
    return helper.fail(`
      Oops! Looks like you have a mistake there. 
      Think about biases, contradictions and logic and try again!
    `);
  }

  // 

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!

  helper.success(`
    Great work! How'd you do?
  `);
};
