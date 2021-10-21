const { remove } = require("ramda");

const { processConversationEvents } = require("./events/conversations");

const levelJson = require("./level.json");

const DEFAULT_MISSION_STATE = {
  ossElephpant2: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        default_welcome: false,
        objective1_1_photo_pre: false,
        objective1_1_photo_post: false,
        objective1_3_pre: false,
        turtle_facts: false,
      },
      professor: {
        objective1_2_professor: false,
      }
    },
    photos: {
    },
    fallacies: {
      fallacyStationsCompleted: 0,
      fallacyStation1: false,
      fallacyStation2: false,
      fallacyStation3: false,
      fallacyStation4: false,
      fallacyStation5: false,
      canPass: false,
    }
  }
}


module.exports = function(event, world) {
  console.log(`OSS Elephpant 2: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalModules = true;

  //DEBUG: Reset all objectives
  if (event.name === 'levelDidLoad') {
    levelJson.objectives.forEach (objective => {
      if (world.isObjectiveCompleted(objective)) {
        world.removeObjective("oss_elephpant_2", objective);
      }
    })
  }

  //const worldState = world.getState("com.twilioquest.osselephpant2") || DEFAULT_MISSION_STATE;
  const worldState = DEFAULT_MISSION_STATE;
  fallacies = worldState.ossElephpant2.fallacies;
  console.log("World State");
  console.log(worldState);


  //Interactable terminal
  /*if (
    event.name === 'playerDidInteract' &&
    event.target &&
    event.target.key === 'ele_terminal'
  ) {
    world.startConversation('ele', 'cedricNeutral.png');
  }*/


  // Some missions can be completed and prompt a conversational dialogue from Ele.
  if (
    (event.name === 'objectiveCompleted' || event.name === 'objectiveCompletedAgain') &&
    event.objective
  ) {
    console.log(event.objective);

    // Some missions can be completed and prompt a conversational dialogue from Ele.
    if (event.objective === "objective1_1_photo") {    
      world.startConversation("ele_objective1_1_photo_post", "ele_down.gif");
    }
    else if (event.objective === "objective1_4_knowledge") {
      world.startConversation("ele_objective1_4_final", "ele_down.gif");
    }

    // If the objective is a fallacy mission
    //console.log("Hello");
    //console.log(typeof(event.objective));
    if (event.objective.indexOf("objective1_3_fallacies_") >= 0) {
      console.log("Fallacies");
      switch (event.objective) {
        case "objective1_3_fallacies_1":
          fallacies.fallacyStation1 = true;
          break;
        case "objective1_3_fallacies_2":
          fallacies.fallacyStation2 = true;
          break;
        case "objective1_3_fallacies_3":
          fallacies.fallacyStation3 = true;
          break;
        case "objective1_3_fallacies_4":
          fallacies.fallacyStation4 = true;
          break;
        case "objective1_3_fallacies_5":
          fallacies.fallacyStation5 = true;
          break;
        default:
          ;
      }
    }
  }

  // Some areas trigger Ele to say something
  if (
    event.name === 'triggerAreaWasEntered' &&
    event.target.name === 'eleDialogTrigger'
  ) {
    processConversationEvents(event, world, worldState, event.target.key);
    console.log("completed");
  }

  // Update count of fallacyStationsCompleted
  fallacies.fallacyStationsCompleted = (
    fallacies.fallacyStation1+
    fallacies.fallacyStation2+
    fallacies.fallacyStation3+
    fallacies.fallacyStation4+
    fallacies.fallacyStation5
  )

  fallacies.canPass = fallacies.fallacyStationsCompleted >= 3;

  // Save state
  world.setState("com.twilioquest.osselephpant2", worldState);

  console.log(world);
}
