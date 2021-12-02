function runTeamSimulation(biasTeamObject) {

  //var astrophysicist = biasTeamObject.astrophysicist[]
  var archetypes = {
    chad: 0,
    karen: 0,
    imani: 0,
    khai: 0,
    yodit: 0
  };

  var team = {
    astrophysicist: "No one",
    biochemist: "No one",
    datascientist: "No one",
    medicaldoctor: "No one",
    xenobiologist: "No one"
  }

  console.log(biasTeamObject);
  //biasTeamObject.products.map((roleName, roleObject) => {
  Object.entries(biasTeamObject).forEach(entry => {
    const [roleName, roleObject] = entry;
    let candidate = roleObject.selected;
    //console.log(candidate);
    //console.log(roleObject);
    let archetype = roleObject[candidate]["archetype"];
    let name = roleObject[candidate]["name"];
    archetypes[archetype]++;
    team[roleName] = name;
  }) 

  var story = "";
  // TODO: logic branch tree story thingy
  // Story Crux 1

  var isSuccess = false;
  var bigSuccess = "Big Success!";
  var smallSuccess = "Small Success.";
  var bigFailure = "Big Failure!";
  var smallFailure = "Small Failure.";

  const notHelpers = ["chad", "karen", "No one"];

  var astrophysicistName = biasTeamObject["astrophysicist"][biasTeamObject["astrophysicist"]["selected"]]["name"];
  var astrophysicistType = biasTeamObject["astrophysicist"][biasTeamObject["astrophysicist"]["selected"]]["archetype"];

  var biochemistName = biasTeamObject["biochemist"][biasTeamObject["biochemist"]["selected"]]["name"];
  var biochemistType = biasTeamObject["biochemist"][biasTeamObject["biochemist"]["selected"]]["archetype"];

  var datascientistName = biasTeamObject["datascientist"][biasTeamObject["datascientist"]["selected"]]["name"];
  var datascientistType = biasTeamObject["datascientist"][biasTeamObject["datascientist"]["selected"]]["archetype"];

  var medicaldoctorName = biasTeamObject["medicaldoctor"][biasTeamObject["medicaldoctor"]["selected"]]["name"];
  var medicaldoctorType = biasTeamObject["medicaldoctor"][biasTeamObject["medicaldoctor"]["selected"]]["archetype"];

  var xenobiologistName = biasTeamObject["xenobiologist"][biasTeamObject["xenobiologist"]["selected"]]["name"];
  var xenobiologistType = biasTeamObject["xenobiologist"][biasTeamObject["xenobiologist"]["selected"]]["archetype"];

  // Big Failure
  if (astrophysicistType === "No one" ||
      (
        ( astrophysicistType === "chad" || 
          astrophysicistType === "karen") 
        && 
          (notHelpers.includes(datascientistType) ||
          (notHelpers.includes(biochemistType) &&
          notHelpers.includes(medicaldoctorType) &&
          notHelpers.includes(xenobiologistType))
          )
      )
   ) {
    story = bigFailure;
  } 
  // Small Failure
  else if (
    (
      ( astrophysicistType === "chad" || 
        astrophysicistType === "karen") 
      || 
        (notHelpers.includes(datascientistType) &&
        notHelpers.includes(biochemistType) &&
        notHelpers.includes(medicaldoctorType) &&
        notHelpers.includes(xenobiologistType))
    )
  ) {
    story = smallFailure;
  }
  // Small Success
  else if (
    notHelpers.includes(datascientistType) 
    || 
        (notHelpers.includes(biochemistType) &&
        notHelpers.includes(medicaldoctorType) &&
        notHelpers.includes(xenobiologistType))
  ) {
    story = smallSuccess;
    isSuccess = true
  }
  // Big Success
  else {
    story = bigSuccess;
    isSuccess = true
  }

  return [story, isSuccess];
}

module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.Bias");


  // Validator 1: Are enough stations solved?
  if (!worldState.Bias.biasStation.canPass) {
    return helper.fail(`
    Please visit the ....
    `);
  }

  const simulationData = runTeamSimulation(worldState.Bias.biasStation.team);

  return simulationData[1] ? helper.success(simulationData[0]) : helper.fail(simulationData[0]);
};
