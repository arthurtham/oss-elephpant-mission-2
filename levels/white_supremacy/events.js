//const { remove } = require("ramda");

const { processConversationEvents, setupConversation } = require("./events/conversations");

const levelJson = require("./level.json");

const updateQuestLogWhenComplete = require("./events/updateQuestLogWhenComplete");

const packageInfo = require("../../package.json");

const DEFAULT_MISSION_STATE = {
  WhiteSupremacy: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        objective1_1_pre: {
          current: 'none',
          complete: false
        }
      }
    }
  }
}

module.exports = function(event, world) {
  console.log(`White Supremacy: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalModules = true;

  let worldState = world.getState("com.twilioquest.WhiteSupremacy") || DEFAULT_MISSION_STATE;

  if (event.name === 'levelDidLoad') {
    console.log("levelDidLoad: resetting default state for debugging");
    worldState = DEFAULT_MISSION_STATE;
    //DEBUG: Reset all objectives
    console.log("Reset completed objectives:");
    levelJson.objectives.forEach (objective => {
      if (world.isObjectiveCompleted(objective)) {
        console.log(objective);
        world.removeObjective("white_supremacy", objective);
      }
    })
  }

  //const worldState = DEFAULT_MISSION_STATE;
  console.log("World State");
  console.log(worldState);

  // Some missions trigger after effects
  if (event.name === 'objectiveCompleted' || event.name === 'objectiveCompletedAgain') {
    // Some missions complete open or close conversation options even if they don't trigger new ones
    const preObjectiveConversations = [];
    if (preObjectiveConversations.includes(event.objective)) {
      let pre = event.objective + "_pre";
      worldState['WhiteSupremacy']['conversations']['ele'][pre]['current'] = "none";
      worldState['WhiteSupremacy']['conversations']['ele'][pre]['complete'] = true;
      worldState.WhiteSupremacy.conversations.ele.current = "none";
    }
    // Some missions can be completed and prompt a conversational dialogue from Ele.
    const postObjectiveConversations = [];
    if (postObjectiveConversations.includes(event.objective)) {
      let chat = event.objective + "_post";
      let post = 'ele_' + chat;
      setupConversation(world, worldState, post);
      worldState['WhiteSupremacy']['conversations']['ele'][chat]['current'] = "none";
      worldState['WhiteSupremacy']['conversations']['ele'][chat]['complete'] = true;
      worldState.WhiteSupremacy.conversations.ele.current = "none";
    }
  }

  // Some areas trigger Ele to say something
  if (
    event.name === 'triggerAreaWasEntered' &&
    event.target.name === 'eleDialogTrigger'
  ) {
    processConversationEvents(event, world, worldState, event.target.key);
    console.log("processConversationEvents completed");
  }

  // Get all textareas and wrap them around
  if (
    event.name === "objectiveDidOpen"
  ) {
    document.querySelectorAll("textarea").forEach( element => {
      element.style.whiteSpace = "normal";
    })
  }

  // Update Quest Log When Complete
  updateQuestLogWhenComplete({
    notification:
      'Yeah! I\'ve completed everything in the <span class="highlight">White Supremacy</span>!',
    log: "I've completed everything in the White Supremacy challenge!",
    event,
    world,
    worldStateKey: "com.twilioquest.WhiteSupremacy",
    version: packageInfo.version,
  });


  // Save state
  world.setState("com.twilioquest.WhiteSupremacy", worldState);
}
