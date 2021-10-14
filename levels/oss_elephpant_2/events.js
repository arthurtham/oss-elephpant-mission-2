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
        turtle_facts: false,
      },
      professor: {
        objective1_2_professor: false,
      }
    },
    photos: {
    },
    fallacies: {
      fallacyStation1: false,
      fallacyStation2: false,
      fallacyStation3: false,
      fallacyStation4: false,
      fallacyStation5: false,
    }
  }
}


module.exports = function(event, world) {
  console.log(`OSS Elephpant 2: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalNodules = true;

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
  console.log("World State");
  console.log(worldState);


  /*if (
    event.name === 'playerDidInteract' &&
    event.target &&
    event.target.key === 'ele_terminal'
  ) {
    world.startConversation('ele', 'cedricNeutral.png');
  }*/

  // Some missions can be completed and prompt a conversational dialogue.
  if (
    (event.name === 'objectiveCompleted' || event.name === 'objectiveCompletedAgain') &&
    event.objective
  ) {
    console.log(event.objective);
    if (event.objective === "objective1_photo") {    
      world.startConversation("ele_objective1_1_photo_post", "cedricNeutral.png");
    }
  }


  if (
    event.name === 'triggerAreaWasEntered' &&
    event.target.name === 'eleDialogTrigger'
  ) {
    processConversationEvents(event, world, worldState, event.target.key);
    console.log("completed");
  }

  world.setState("com.twilioquest.osselephpant2", worldState);

  console.log(world);
}
