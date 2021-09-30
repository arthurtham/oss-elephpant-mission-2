function setupConversation(world, worldState, name) {
    console.log("start conversation: " + worldState.ossElephpant2.conversations.ele.current);
    worldState.ossElephpant2.conversations.ele.current = name;
    console.log("result: " + worldState.ossElephpant2.conversations.ele.current);
    world.startConversation('ele', 'cedricNeutral.png');
    worldState.ossElephpant2.conversations.ele[name] = true;
  }
  
  function processConversationEvents(event, world, worldState, name) {
    console.log('processConversationEvents (' + name + ')');
    const key = event.target.key;
    if (worldState.ossElephpant2.conversations.ele[key] === false) {
      setupConversation(world, worldState, key);
    }
  }
  
  module.exports = {
    processConversationEvents
  };
  