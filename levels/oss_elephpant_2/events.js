const { remove } = require("ramda");

const { processConversationEvents } = require("./events/conversations");

const DEFAULT_MISSION_STATE = {
  ossElephpant2: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        default_welcome: false,
        turtle_facts: false,
      },
    },
    photos: {
      challenge_1_1_photo: false
    }
  }
}


module.exports = function(event, world) {
  console.log(`OSS Elephpant 2: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalNodules = true;

  /*if (event.name === 'levelDidLoad') {
    // reset mission on levelDidLoad for testing
    console.log('reset mission on levelDidLoad for testing');
    completedObjectives = world.getContext('completedObjectives');
    console.log(completedObjectives);
    world.setState('com.twilioquest.osselephpant2', DEFAULT_MISSION_STATE);
  }*/

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

  /*if (
    (event.name === 'objectiveCompleted' || event.name === "objectiveCompletedAgain") &&
    event.objective &&
    event.objective === "turtle_facts"
  ) {
    console.log(event.objective);
    console.log("owo");
    //if (worldState.ossElephpant2.conversations.ele["turtle_facts"] === false) {
      worldState.ossElephpant2.conversations.ele["turtle_facts"] = false;
      worldState.ossElephpant2.conversations.ele.current = "turtle_facts";
      //world.startConversation('ele', 'cedricNeutral.png');
      processConversationEvents(event, world, worldState, "turtle_facts")
    //} 
  }*/


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
