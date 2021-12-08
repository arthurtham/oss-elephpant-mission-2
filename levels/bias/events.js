const { remove } = require("ramda");

const { processConversationEvents, setupConversation } = require("./events/conversations");

const levelJson = require("./level.json");

const { viewpointEvent } = require("./events/viewpointcutscenes");

const updateQuestLogWhenComplete = require("./events/updateQuestLogWhenComplete");

const { greenTileHelper } = require("./events/greenTileHelper");

const stationsCompletedTracker = require("./events/stationsCompletedTracker")


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
      stationFlags : {
        objective2_5_deepmaze_1: false,
        objective2_5_deepmaze_2: false,
        objective2_5_deepmaze_3: false,
        objective2_5_deepmaze_4: false,
        objective2_5_deepmaze_5: false
      },
      canPass: false
    },
    biasStation: {
      stationsCompleted: 0,
      stationFlags : {
        teammate_select_astrophysicist: false,
        teammate_select_biochemist: false,
        teammate_select_datascientist: false,
        teammate_select_medicaldoctor: false,
        teammate_select_xenobiologist: false
      },
      team : {
        astrophysicist: {
          description: "Your team's astrophysicist will be responsible for keeping watch on your investigation satellites' navigation AI and sensor arrays to make adjustments as necessary to trajectories and anticipated physical events.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None"
          },
          b: {
            archetype: "chad",
            name: "Jeremy",
            education: "1. Graduated from an Ivy League university with a strong Astrophysics program",
            experience: "Likes Cheese"
          },
          c: {
            archetype: "karen",
            name: "Claudia",
            education: "1. Graduated from an Ivy League university with a strong Astrophysics program",
            experience: "Likes Apples"
          },
          d: {
            archetype: "karen",
            name: "Sharon",
            education: "None",
            experience: "None"
          },
          e: {
            archetype: "khai",
            name: "Jerome",
            education: "None",
            experience: "None"
          },
          f: {
            archetype: "yodit",
            name: "Becky",
            education: "None",
            experience: "None"
          }
        },
        biochemist: {
          description: "Your team's biochemist will be responsible for monitoring and maintaining the biochemical support systems in any artificial or augmented habitats utilized during transport, monitoring, or terraforming processes for the ecologies relied on by your team and potential future colonists.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None"
          },
          b: {
            archetype: "imani",
            name: "imani 1",
            education: "None",
            experience: "None"
          },
          c: {
            archetype: "karen",
            name: "karen 2",
            education: "None",
            experience: "None"
          },
          d: {
            archetype: "karen",
            name: "karen 3",
            education: "None",
            experience: "None"
          },
          e: {
            archetype: "karen",
            name: "karen 4",
            education: "None",
            experience: "None"
          },
          f: {
            archetype: "chad",
            name: "chad 5",
            education: "None",
            experience: "None"
          }
        },
        datascientist: {
          description: "Your team's data scientist will be responsible for using programming and analysis to turn a combination of input from records, sensors, and the other team experts into actionable data in the form of maps and system models.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None"
          },
          b: {
            archetype: "chad",
            name: "chad 1",
            education: "None",
            experience: "None"
          },
          c: {
            archetype: "khai",
            name: "khai 2",
            education: "None",
            experience: "None"
          },
          d: {
            archetype: "chad",
            name: "chad 3",
            education: "None",
            experience: "None"
          },
          e: {
            archetype: "karen",
            name: "karen 4",
            education: "None",
            experience: "None"
          },
          f: {
            archetype: "chad",
            name: "chad 5",
            education: "None",
            experience: "None"
          }
        },
        medicaldoctor: {
          description: "Your team's medical doctor will be responsible for monitoring the wellbeing of your team, intervening as necessary, and providing input on the suitability of potential situations and environments to the nurturance of humans across variable timescales and taking into account anticipated changes.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None"
          },
          b: {
            archetype: "chad",
            name: "chad 1",
            education: "None",
            experience: "None"
          },
          c: {
            archetype: "chad",
            name: "chad 2",
            education: "None",
            experience: "None"
          },
          d: {
            archetype: "karen",
            name: "karen 3",
            education: "None",
            experience: "None"
          },
          e: {
            archetype: "yodit",
            name: "yodit 4",
            education: "None",
            experience: "None"
          },
          f: {
            archetype: "karen",
            name: "karen 5",
            education: "None",
            experience: "None"
          }
        },
        xenobiologist: {
          description: "Your team's xenobiologist will be responsible for detecting, analyzing, and providing input on both any existing life detected during investigations as well as informing system models relating to adapting potential planets' environmental systems to the ecologies necessary to support human settlement.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None"
          },
          b: {
            archetype: "imani",
            name: "imani 1",
            education: "None",
            experience: "None"
          },
          c: {
            archetype: "karen",
            name: "karen 2",
            education: "None",
            experience: "None"
          },
          d: {
            archetype: "karen",
            name: "karen 3",
            education: "None",
            experience: "None"
          },
          e: {
            archetype: "chad",
            name: "chad 4",
            education: "None",
            experience: "None"
          },
          f: {
            archetype: "chad",
            name: "chad 5",
            education: "None",
            experience: "None"
          }
        }
      },
      canPass: false
    },
    missionComplete: {
      complete: false,
      dialogueCompleted:false,
      teleport: false
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
      deepMaze.stationFlags[event.objective] = true;
      worldState.Bias.deepMaze = stationsCompletedTracker(deepMaze, 4);
    }

    // Bias simulator team select mission stuff
    if (event.objective.indexOf("teammate_select_") >= 0) {
      console.log("Bias Simulator");
      let biasStation = worldState.Bias.biasStation;
      worldState.Bias.biasStation = stationsCompletedTracker(biasStation, 3);
    }

    // If the main bias simulator terminal is complete, set a flag
    if (event.objective.indexOf("objective_simulator") >= 0) {
      worldState.Bias.missionComplete.complete = true;
    }
  }

  // If the main bias simulator terminal is complete and a dialogue
  // with Cedric is complete, teleport out.
  if (event.name === "conversationDidEnd" && 
      event.npc.conversation === "cedric_simulator_pre") {
      //console.log("Check if we should teleport out");
      if (worldState.Bias.missionComplete.complete &&
        worldState.Bias.missionComplete.teleport) {
          worldState.Bias.missionComplete.teleport = false;
          world.warp("critical_thinking", "player_entry1", "default");
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
      //console.log("Found: ");
      //console.log(instance);
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


  // If the bias simulator objective is closed and completed, trigger dialogue from Ele
  if (
    event.name === "objectiveDidClose" &&
    event.target.objectiveName === "objective_simulator" &&
    world.isObjectiveCompleted("objective_simulator") &&
    !worldState.Bias.missionComplete.dialogueCompleted
  ) {
    worldState.Bias.conversations.ele.current = "none";
    worldState.Bias.missionComplete.dialogueCompleted = true;
    var chat = "cedric_simulator_post";
    world.startConversation(chat, "cedricHappy.png");
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
