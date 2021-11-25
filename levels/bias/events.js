const { remove } = require("ramda");

const { processConversationEvents, setupConversation } = require("./events/conversations");

const levelJson = require("./level.json");

const { viewpointEvent } = require("./events/viewpointcutscenes");

const updateQuestLogWhenComplete = require("./events/updateQuestLogWhenComplete");

const { greenTileHelper } = require("./events/greenTileHelper");


const packageInfo = require("../../package.json");

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
        objective2_5_deepmaze_post: {
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
      canPass: false
    },
    biasStation: {
      stationsCompleted: 0,
      canSimulate: false
    },
    objective: {
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
    const preObjectiveConversations = ["", "", ""];
    if (preObjectiveConversations.includes(event.objective)) {
      let pre = event.objective + "_pre";
      worldState['Bias']['conversations']['ele'][pre]['current'] = "none";
      worldState['Bias']['conversations']['ele'][pre]['complete'] = true;
      worldState.Bias.conversations.ele.current = "none";
    }
    // Some missions can be completed and prompt a conversational dialogue from Ele.
    const postObjectiveConversations = ["", "", ""];
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
      deepMaze.stationsCompleted = (
        deepMaze.objective2_5_deepmaze_1+
        deepMaze.objective2_5_deepmaze_2+
        deepMaze.objective2_5_deepmaze_3+
        deepMaze.objective2_5_deepmaze_4+
        deepMaze.objective2_5_deepmaze_5
      )
      deepMaze.canPass = deepMaze.stationsCompleted >= 4;
      worldState.Bias.deepMaze = deepMaze;
    }

  }

  // Green tile indicator
  greenTileHelper(world, worldState, event);

  // Green tile sorter
  if (
    event.name === "mapDidLoad" &&
    event.mapName === "cryo"
  ) {
    world.forEachEntities(entity => {
      if (!entity.instance || !entity.instance.key) { 
        return false;
      } else {
        return (
          entity.instance.key.indexOf("deepmaze_green") >= 0 ||
          entity.instance.key.indexOf("bias_pipe") >= 0
        );
      }
    }, instance => {
      console.log("Found: ");
      console.log(instance);
      instance.sprite.body.height = 0;
    })
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
    (event.name === "objectiveDidOpen") //&&
    //(event.target.objectiveName.indexOf("objective2_5_deepmaze_") >= 0)
  ) {
    worldState.Bias.objective.hasEnoughTimePassed = false;
    worldState.Bias.objective.current = event.target.objectiveName;
    world.scheduleTimerEvent(payload = {type: "objectiveTimer", objectiveName: event.target.objectiveName}, timeout = 1 * 1000);
    console.log("SCHEDULE TIMER");
  }
  // If the objective is closed, tell world state the objective isn't open anymore
  if (
    (event.name === "objectiveDidClose")
  ) {
    worldState.Bias.objective.current = "none";
    worldState.Bias.objective.hasEnoughTimePassed = false;
  }
  // Timer: track if the objective has been opened long enough
  if (
    event.name === "timerDidTrigger" &&
    event.type === "objectiveTimer"
  ) {
    if (event.objectiveName === worldState.Bias.objective.current) {
      worldState.Bias.objective.hasEnoughTimePassed = true;
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

  // Update Quest Log When Complete
  updateQuestLogWhenComplete({
    notification:
      'Yeah! I\'ve completed everything in the <span class="highlight">Bias challenge</span>!',
    log: "I've completed everything in the Bias challenge!",
    event,
    world,
    worldStateKey: "com.twilioquest.Bias",
    version: packageInfo.version,
  });

  // Save state
  world.setState("com.twilioquest.Bias", worldState);
}
