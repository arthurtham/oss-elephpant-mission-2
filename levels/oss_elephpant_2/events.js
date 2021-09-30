const { remove } = require("ramda");

const { processConversationEvents } = require("./events/conversations");

const DEFAULT_MISSION_STATE = {
  ossElephpant2: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        default_welcome: false,
      }
    }
  }
}


module.exports = function(event, world) {
  console.log(`OSS Elephpant 2: ${event.name}`);
  console.log(event);

  if (event.name === 'levelDidLoad') {
    // reset mission on levelDidLoad for testing
    console.log('reset mission on levelDidLoad for testing');
    completedObjectives = world.getContext('completedObjectives');
    console.log(completedObjectives);
    world.setState('oss_elephpant2WorldState', DEFAULT_MISSION_STATE);
  }

  const worldState = world.getState("oss_elephpant2WorldState") || DEFAULT_MISSION_STATE;
  //const worldState = DEFAULT_MISSION_STATE;
  console.log("World State");
  console.log(worldState);


  if (
    event.name === 'playerDidInteract' &&
    event.target &&
    event.target.key === 'ele_terminal'
  ) {
    world.startConversation('ele', 'ele');
  }


  if (
    event.name === 'triggerAreaWasEntered' &&
    event.target.name === 'eleDialogTrigger'
  ) {
    processConversationEvents(event, world, worldState, event.target.key);
    console.log("completed");
  }

  world.setState("oss_elephpant2WorldState", worldState);

  console.log(world);
}
