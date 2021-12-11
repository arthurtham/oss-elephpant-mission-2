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

  function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }
  


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

  // *** START STORIES *** //
  var isSuccess = false; 
  var story = "";
  var teamHelperName = "No one";

  // // Big Failure
  // var bigFailure = "Big Failure!";

  // // Small Failure
  // var smallFailure = "Small Failure.";

  // // Small Success
  // var smallSuccess = "Small Success.";

  // // Big Success
  // var bigSuccess = "Big Success!";

  // *** END STORIES *** //

  // Big Failure
  if (astrophysicistType === "No one" ||
      (
        ( astrophysicistType === "chad" || 
          astrophysicistType === "karen") 
        && 
          //(notHelpers.includes(datascientistType) ||
          (datascientistType === "No one" ||
          (notHelpers.includes(datascientistType) &&
          notHelpers.includes(biochemistType) &&
          notHelpers.includes(medicaldoctorType) &&
          notHelpers.includes(xenobiologistType))
          )
      )
   ) {
     if (astrophysicistType === "No one") {
       story = "Although your ship's navigation AI has the most up to date information available on this system, you realize it's missing at least one significant asteroid belt as the proximity alarms scream and you attempt to augment the AI's maneuvers to incorporate this new information. As the impacts begin, you wonder if an Astrophysicist could've seen this coming with enough time to avoid your crushing destruction."
     } else {
       story = "[astrophysicist] analyzes discrepancies between the navigation AI's predictive data and the sifted input from orientation sensors. Then they spend a few hours making careful updates to the navigation system's maps. When they begin to celebrate you ask what they've been working on. They explained how they determined that a spray of unpredicted light was almost certainly an asteroid belt of significant size, and had begun unpacking how their software update had allowed for such a gentle adjustment that the crew hadn't noticed when the impacts began demonstrating the brutality of physics. You wonder what this very clever human missed in their very clever solution, but only briefly.".replace("[astrophysicist]", astrophysicistName);
     }
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
    story = "[astrophysicist] and [data scientist] analyze discrepancies between the navigation AI's predictive data and the sifted input from orientation sensors. Then they spend a few hours making careful updates to the navigation system's maps. [data scientist] draws your attention by insisting a bit forcefully that [astrophysicist]'s priorities were misplaced, and moved to continue working intently. It didn't seem like much time had passed before [astrophysicist] was happily joking that [data scientist]'s concerns had been entirely misplaced as the solution was both elegant AND fast to implement. You were smiling with relief when [data scientist] muttered something about missing the point and was urgently entering updates into the computers when you're overwhelmed by a thunder like a hail storm pummeling the hull. [data scientist] assures you that y'all dodged the largest chunks of asteroid by a mile but you realize you're in too much shock to really take in the details. You're almost grateful that [astrophysicist] doesn't have anything to say on the trip back to the OSS Elephpant for repairs and evaluations.";
    story = replaceAll(story, "[astrophysicist]", astrophysicistName);
    story = replaceAll(story, "[data scientist]", datascientistName);
  }
  // Small Success
  else if (
    notHelpers.includes(datascientistType) 
    || 
        (notHelpers.includes(biochemistType) &&
        notHelpers.includes(medicaldoctorType) &&
        notHelpers.includes(xenobiologistType))
  ) {
    teamHelperName
    if (notHelpers.includes(datascientistType)) {
      if (!notHelpers.includes(biochemistType)) {
        teamHelperName = biochemistName;
      } else if (!notHelpers.includes(medicaldoctorType)) {
        teamHelperName = medicaldoctorName;
      } else {
        teamHelperName = xenobiologistName;
      }
      story = "[astrophysicist] and [data scientist] analyze discrepancies between the navigation AI's predictive data and the sifted input from orientation sensors. Then they spend some time making careful updates to the navigation system's maps. [other.team.human] draws your attention when they join [astrophysicist] and [data scientist]'s tight huddle, and you realize they seem to be having a disagreement. [other.team.human] rehashes the disagreement – something about substances reflecting light differently and how to account for what they weren't seeing with math – but you didn't follow the specifics. You ask if there's a way to assume the maximum size of invisible space stuff to play it safe. They look at each other and there's shrugging and nodding and a general decrease in tension as [astrophysicist] and [data scientist] get back to quietly talking and tapping at their keyboards, and [other.team.human] wanders off. Later, as you're looking at bird's eye renderings of the newly discovered asteroid belt, you wonder if you should have tried to cut it closer to still have enough fuel to investigate the original target planet before heading back to the OSS Elephpant. Regardless, this is a good trip yielding valuable data for future exploration.";
      story = replaceAll(story, "[astrophysicist]", astrophysicistName);
      story = replaceAll(story, "[data scientist]", datascientistName);
      story = replaceAll(story, "[other.team.human]", teamHelperName);
    } else { // Data Scientist & Astrophysicist == Helpers
      var teamHelperNameArray = [];
      if (biochemistType !== "No one") {
        teamHelperNameArray.push(biochemistName);
      }
      if (medicaldoctorType !== "No one") {
        teamHelperNameArray.push(medicaldoctorName);
      }
      if (xenobiologistType !== "No one") {
        teamHelperNameArray.push(xenobiologistName);
      } 
      teamHelperName = teamHelperNameArray[Math.floor(Math.random()*teamHelperNameArray.length)];
      story = "[astrophysicist] and [data scientist] analyze discrepancies between the navigation AI's predictive data and the sifted input from orientation sensors. Then they spend a few hours making careful updates to the navigation system's maps. They draw your attention as their discussion increases in volume and urgency, so you ask them what's up. They were explaining something about how light hits various substances that might or might not be smooshed together and floating in space, when you cut them off and ask them to sum up. [astrophysicist] then says there are big rocks in space, but that we only see part of the rocks and the rest of the rocks we have to guess at with less than obvious math. You make a face which you hope conveys that you've heard of asteroids and are still not sure they've gotten to the point. [data scientist] interjects that the invisible bits will either smash us up or we will do dramatic things to our trajectory in the near future. You gesture wildly at them and say something to the effect of Do The Thing before you remember that bodies can be smashed apart by fancy maneuvers in addition to space rocks and yell at the crew to strap in. Everyone is mostly fine, but [other.team.human]'s broken leg and some fairly substantial damage to externally exposed system components meant a trip back to the Elephpant for repairs and evaluations."
      story = replaceAll(story, "[astrophysicist]", astrophysicistName);
      story = replaceAll(story, "[data scientist]", datascientistName);
      story = replaceAll(story, "[other.team.human]", teamHelperName);
    }
    isSuccess = true;
  }
  // Big Success
  else {
    if (!notHelpers.includes(biochemistType)) {
      teamHelperName = biochemistName;
    } else if (!notHelpers.includes(medicaldoctorType)) {
      teamHelperName = medicaldoctorName;
    } else {
      teamHelperName = xenobiologistName;
    }
    story = "[astrophysicist] and [data scientist] analyze discrepancies between the navigation AI's predictive data and the sifted input from orientation sensors. Then they spend some time making careful updates to the navigation system's maps. [other.team.human] draws your attention when they join [astrophysicist] and [data scientist]'s tight huddle, and you realize they're having an animated discussion. They're engaged and throwing ideas back and forth, discussing different ways they could model some data they were looking at. It became much less abstract as [other.team.human] started quietly explaining the highlights of what they were looking at and your mind formed an impression of an asteroid belt out of the hypothetical blobs they were rendering. [other.team.human]'s intuitive summary seemed to have a positive impact on whatever problem they'd been struggling with and things got kind of quiet and intense for a bit. After checking some assumptions with [other.team.human] you put out the order for everyone to strap in, so [astrophysicist] and [data scientist] could make continual incremental adjustments and reevaluations over the next several hours. It was decidedly less boring than you prefer your travel but everyone's excited to have a trove of valuable new information to add to as you settle safely into orbit around the planet targeted for investigation.";
    story = replaceAll(story, "[astrophysicist]", astrophysicistName);
    story = replaceAll(story, "[data scientist]", datascientistName);
    story = replaceAll(story, "[other.team.human]", teamHelperName);
    isSuccess = true;
  }

  return [story, isSuccess];
}

module.exports = async function (helper) {
  const worldState = helper.world.getState("com.twilioquest.Bias");


  // Validator 1: Are enough stations solved?
  if (!worldState.Bias.biasStation.canPass) {
    return helper.fail(`
    Please select at least 3 team members before starting the simulator! 
    `);
  }

  const simulationData = runTeamSimulation(worldState.Bias.biasStation.team);

  return simulationData[1] ? helper.success(simulationData[0]) : helper.fail(simulationData[0]);
};
