function eleGif() {
  const gifs = [ 'up', 'down', 'left', 'right' ];
  const random = Math.floor(Math.random() * gifs.length);
  const gif = 'ele_' + gifs[random] + '.gif';

  return gif;
}
function setupConversation(world, worldState, name) {
    //console.log("existing ele chat: " + worldState.ossElephpant2.conversations.ele.current);
    worldState.ossElephpant2.conversations.ele.current = name;
    console.log("new ele chat: " + worldState.ossElephpant2.conversations.ele.current);
    world.startConversation('eleChats', eleGif());
    worldState.ossElephpant2.conversations.ele[name] = true;
  }

  function processConversationEvents(event, world, worldState, name) {
    //console.log('processConversationEvents (' + name + ')');
    const key = event.target ? event.target.key : name;
    //console.log('key: ' + key);
    if (worldState.ossElephpant2.conversations.ele[key] === false) {
      setupConversation(world, worldState, key);
    }
  }

  module.exports = {
    processConversationEvents
  };
