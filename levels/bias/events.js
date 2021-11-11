const { remove } = require("ramda");

const { processConversationEvents, setupConversation } = require("./events/conversations");

const levelJson = require("./level.json");

const { viewpointEvent } = require("./events/viewpointcutscenes");

const DEFAULT_MISSION_STATE = {
  Bias: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        objective2_1_definebias_pre: {
          current: 'none',
          complete: false
        },
        objective2_2_unconsciousbiaspractice_pre: {
          current: 'none',
          complete: false
        },
        turtle_facts: {
          current: 'none',
          complete: false
        },
      },
      professor: {
        objective1_2_professor: false,
      }
    },
    photos: {
    },
    deepMaze: {
      stationsCompleted: 0,
      objective2_5_deepmaze_1: false,
      objective2_5_deepmaze_2: false,
      objective2_5_deepmaze_3: false,
      objective2_5_deepmaze_4: false,
      objective2_5_deepmaze_5: false,
      canPass: false,
      hasEnoughTimePassed: false,
      current: "none"
    }
  }
}

module.exports = function(event, world) {
  console.log(`Bias: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalModules = true;

  let worldState = world.getState("com.twilioquest.Bias") || DEFAULT_MISSION_STATE;

  if (event.name === 'levelDidLoad') {
    console.log("levelDidLoad: resetting default state for debugging");
    worldState = DEFAULT_MISSION_STATE;
    //DEBUG: Reset all objectives
    console.log("Reset completed objectives:");
    levelJson.objectives.forEach (objective => {
      if (world.isObjectiveCompleted(objective)) {
        console.log(objective);
        world.removeObjective("bias", objective);
      }
    })
  }

  //const worldState = DEFAULT_MISSION_STATE;
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


  // Some missions trigger after effects
  if (event.name === 'objectiveCompleted' || event.name === 'objectiveCompletedAgain') {
    // Some missions complete open or close conversation options even if they don't trigger new ones
    const preObjectiveConversations = ["objective1_1_photo", "objective1_2_brainteaser", "objective1_3_fallacies"];
    if (preObjectiveConversations.includes(event.objective)) {
      let pre = event.objective + "_pre";
      worldState['Bias']['conversations']['ele'][pre]['current'] = "none";
      worldState['Bias']['conversations']['ele'][pre]['complete'] = true;
      worldState.Bias.conversations.ele.current = "none";
    }
    // Some missions can be completed and prompt a conversational dialogue from Ele.
    const postObjectiveConversations = ["objective1_1_photo", "objective1_4_worstauntever", "objective1_4_knowledge"];
    if (postObjectiveConversations.includes(event.objective)) {
      let chat = event.objective + "_post";
      let post = 'ele_' + chat;
      setupConversation(world, worldState, post);
      worldState['Bias']['conversations']['ele'][chat]['current'] = "none";
      worldState['Bias']['conversations']['ele'][chat]['complete'] = true;
      worldState.Bias.conversations.ele.current = "none";
    }

    // Deep maze missions are tracked as their own category
    if (event.objective.indexOf("objective2_5_deepmaze_") >= 0) {
      console.log("Deep Maze");
      let deepMaze = worldState.Bias.deepMaze;
      deepMaze[event.objective] = true;
      // Update count of fallacyStationsCompleted
      deepMaze.fallacyStationsCompleted = (
        deepMaze.objective2_5_deepmaze_1+
        deepMaze.objective2_5_deepmaze_2+
        deepMaze.objective2_5_deepmaze_3+
        deepMaze.objective2_5_deepmaze_4+
        deepMaze.objective2_5_deepmaze_5
      )
      deepMaze.canPass = deepMaze.stationsCompleted >= 3;
      worldState.Bias.deepMaze = deepMaze;
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

  // Viewpoint Cutscenes
  viewpointEvent(world, worldState, event);

  // Deep Maze: Timer events (objective must be open for long enough)
  // Open: track which one is opened and schedule a timer
  if (
    (event.name === "objectiveDidOpen") &&
    (event.target.objectiveName.indexOf("objective2_5_deepmaze_") >= 0)
  ) {
    worldState.Bias.deepMaze.hasEnoughTimePassed = false;
    worldState.Bias.deepMaze.current = event.target.objectiveName;
    world.scheduleTimerEvent(payload = {type: "deepmaze", objectiveName: event.target.objectiveName}, timeout = 5000);
    console.log("SCHEDULE TIMER");
  }
  // If the objective is closed, tell world state the objective isn't open anymore
  if (
    (event.name === "objectiveDidClose")
  ) {
    worldState.Bias.deepMaze.current = "none";
    worldState.Bias.deepMaze.hasEnoughTimePassed = false;
  }
  // Timer: track if the objective has been opened long enough
  if (
    event.name === "timerDidTrigger" &&
    event.type === "deepmaze"
  ) {
    if (event.objectiveName === worldState.Bias.deepMaze.current) {
      worldState.Bias.deepMaze.hasEnoughTimePassed = true;
      console.log("TIMER SUCCESS");
    } else {
      console.log("TIMER FAIL (objective name diff)");
    }
  }

  // Get all textareas and wrap them around
  if (
    event.name === "objectiveDidOpen"
  ) {
    document.querySelectorAll("textarea").forEach( element => {
      element.style.whiteSpace = "normal";
    })
  }

  // Save state
  world.setState("com.twilioquest.Bias", worldState);
}
