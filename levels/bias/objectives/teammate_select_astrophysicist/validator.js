const teamSelectHelper = require("../lib/team_select_helper");

module.exports = async function (helper) {
  return teamSelectHelper(helper, "teammate_select_astrophysicist");
};
