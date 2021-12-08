const { remove } = require("ramda");

const { processConversationEvents, setupConversation } = require("./events/conversations");

const levelJson = require("./level.json");

const updateQuestLogWhenComplete = require("./events/updateQuestLogWhenComplete");

const packageInfo = require("../../package.json");

const DEFAULT_MISSION_STATE = {
  CriticalThinking: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        objective1_1_photo_pre: {
          current: 'none',
          complete: false
        },
        objective1_1_photo_post: {
          current: 'none',
          complete: false,
          captionFoundText: "none",
          captionNotFoundText: "none"
        },
        objective1_2_brainteaser_pre: {
          current: 'none',
          complete: false
        },
        objective1_3_fallacies_pre: {
          current: 'none',
          complete: false
        },
        objective1_3_fallacies_post: {
          current: 'none',
          complete: false
        },
        objective1_4_knowledge_post: {
          current: 'none',
          complete: false
        },
        objective1_4_mcd_post: {
          current: 'none',
          complete: false,
          captionFoundText: "none",
          captionNotFoundText: "none"
        },
        objective1_4_worstauntever_post: {
          current: 'none',
          complete: false,
          captionFoundText: "none",
          captionNotFoundText: "none"
        },
        turtle_facts: {
          current: 'none',
          complete: false,
        },
      },
      professor: {
        objective1_2_professor: false,
      }
    },
    photos: {
    },
    fallacies: {
      fallacyStationsCompleted: 0,
      objective1_3_fallacies_1: false,
      objective1_3_fallacies_2: false,
      objective1_3_fallacies_3: false,
      objective1_3_fallacies_4: false,
      objective1_3_fallacies_5: false,
      canPass: false,
    }
  }
}

module.exports = function(event, world) {
  console.log(`Critical Thinking: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalModules = true;

  let worldState = world.getState("com.twilioquest.CriticalThinking") || DEFAULT_MISSION_STATE;

  /*if (event.name === 'levelDidLoad') {
    console.log("levelDidLoad: resetting default state for debugging");
    worldState = DEFAULT_MISSION_STATE;
    //DEBUG: Reset all objectives
    console.log("Reset completed objectives:");
    levelJson.objectives.forEach (objective => {
      if (world.isObjectiveCompleted(objective)) {
        console.log(objective);
        world.removeObjective("critical_thinking", objective);
      }
    })
  }*/

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
      worldState['CriticalThinking']['conversations']['ele'][pre]['current'] = "none";
      worldState['CriticalThinking']['conversations']['ele'][pre]['complete'] = true;
      worldState.CriticalThinking.conversations.ele.current = "none";
    }
    // Some missions can be completed and prompt a conversational dialogue from Ele.
    const postObjectiveConversations = ["objective1_1_photo", "objective1_4_worstauntever", "objective1_4_mcd", "objective1_4_knowledge"];
    if (postObjectiveConversations.includes(event.objective)) {
      let chat = event.objective + "_post";
      let post = 'ele_' + chat;
      setupConversation(world, worldState, post);
      worldState['CriticalThinking']['conversations']['ele'][chat]['current'] = "none";
      worldState['CriticalThinking']['conversations']['ele'][chat]['complete'] = true;
      worldState.CriticalThinking.conversations.ele.current = "none";
    }
    // Fallacy missions are tracked as their own category
    if (event.objective.indexOf("objective1_3_fallacies_") >= 0) {
      console.log("Fallacies");
      let fallacies = worldState.CriticalThinking.fallacies;
      fallacies[event.objective] = true;
      // Update count of fallacyStationsCompleted
      fallacies.fallacyStationsCompleted = (
          fallacies.objective1_3_fallacies_1+
          fallacies.objective1_3_fallacies_2+
          fallacies.objective1_3_fallacies_3+
          fallacies.objective1_3_fallacies_4+
          fallacies.objective1_3_fallacies_5
      )
      fallacies.canPass = fallacies.fallacyStationsCompleted >= 3;
      worldState.CriticalThinking.fallacies = fallacies;
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


  //
  // TODO: Combine all viewpoint cutscenes for mapDidLoad into one place.
  // 

  // When the objective 1.4 room has been entered, show a quick cutscene.
  if (
    event.name === 'mapDidLoad' &&
    event.mapName === 'objective4room' &&
    !world.isObjectiveCompleted("objective1_4_knowledge")
  ) {
    world.forEachEntities("final_viewpoint", async (viewpoint) => {
      world.disablePlayerMovement();
      await world.wait(500);
      await world.tweenCameraToPosition({
        x: viewpoint.startX,
        y: viewpoint.startY,
      });
      await world.wait(1500);
      await world.tweenCameraToPlayer();
      world.enablePlayerMovement();
    });
  }

  //
  // TODO: Combine together cutscenes when objectiveDidClose to one module
  //

  // When the fallacy maze is finished, show the player that the gates have been unlocked.
  if (
    event.name === 'objectiveDidClose' &&
    event.target.objectiveName === 'objective1_3_fallacies' &&
    worldState['CriticalThinking']['conversations']['ele']['objective1_3_fallacies_post']['complete'] === false &&
    world.isObjectiveCompleted('objective1_3_fallacies')
  ) {
    // Now, show that the gate has been revealed!  
    world.forEachEntities("fallacy_mission_complete_viewpoint", async (viewpoint) => {
      world.disablePlayerMovement();

      await world.tweenCameraToPosition({
        x: viewpoint.startX,
        y: viewpoint.startY,
      });
      await world.wait(1500);

      let chat = "objective1_3_fallacies_post";
      setupConversation(world, worldState, "ele_"+chat)
      worldState['CriticalThinking']['conversations']['ele'][chat]['current'] = "none";
      worldState['CriticalThinking']['conversations']['ele'][chat]['complete'] = true;
      worldState.CriticalThinking.conversations.ele.current = "none";

      await world.tweenCameraToPlayer();

      world.enablePlayerMovement();
    });
  }

  // When the concept trains objective is finished, show the player the location of the next area.
  if (
    event.name === 'objectiveDidClose' &&
    event.target.objectiveName === 'objective1_2_concept' &&
    world.isObjectiveCompleted('objective1_2_concept') &&
    !world.isObjectiveCompleted('objective1_2_brainteaser')
  ) {
    // Now, show that the gate has been revealed!  
    world.forEachEntities("viewpoint", async (viewpoint) => {
      world.disablePlayerMovement();

      await world.tweenCameraToPosition({
        x: viewpoint.startX,
        y: viewpoint.startY,
      });
      await world.wait(1500);
      await world.tweenCameraToPlayer();
      world.enablePlayerMovement();
    });
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
      'Yeah! I\'ve completed everything in the <span class="highlight">Critical Thinking challenge</span>!',
    log: "I've completed everything in the Critical Thinking challenge!",
    event,
    world,
    worldStateKey: "com.twilioquest.CriticalThinking",
    version: packageInfo.version,
  });


  // Save state
  world.setState("com.twilioquest.CriticalThinking", worldState);
}
