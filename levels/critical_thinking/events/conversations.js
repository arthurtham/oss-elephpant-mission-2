  function eleGif() {
    const gifs = [ 'up', 'down', 'left', 'right' ];
    const random = Math.floor(Math.random() * gifs.length);
    return 'ele_' + gifs[random] + '.gif';
  }

  function setupConversation(world, worldState, name) {
    if (worldState.CriticalThinking.conversations.ele.current === "none") {
      worldState.CriticalThinking.conversations.ele.current = name;
      console.log("start ele chat: " + worldState.CriticalThinking.conversations.ele.current);
    } else {
      console.log("continue ele chat: " + worldState.CriticalThinking.conversations.ele.current);
    }
    if (name.indexOf("_pre") >= 0) {
      name = 'eleChats';
    }
    world.startConversation(name, eleGif());
  }

  function processConversationEvents(event, world, worldState, name) {
    //console.log('processConversationEvents (' + name + ')');
    const key = event.target ? event.target.key : name;
    console.log('key: ' + key);
    console.log(worldState.CriticalThinking.conversations.ele);

    if (worldState.CriticalThinking.conversations.ele[key]['complete'] === false) {
      setupConversation(world, worldState, key);
    } else {
      worldState.CriticalThinking.conversations.ele.current = "none";
    }
  }

  module.exports = {
    processConversationEvents, setupConversation
  };
