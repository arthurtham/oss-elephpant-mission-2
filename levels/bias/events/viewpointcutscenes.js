const { processConversationEvents } = require("./conversations");

function viewpointEvent(world, worldState, event) {
    // If the map just loaded:
    if (event.name == "mapDidLoad") {
        // If we're in the cryo room
        if (event.mapName === "cryo") {
            // TODO: criteria to introduce the player to the "LinkedIn NPCs"
            if (true) {
                world.forEachEntities("viewpoint", async (viewpoint) => {
                    world.disablePlayerMovement();
            
                    await world.tweenCameraToPosition({
                    x: viewpoint.startX,
                    y: viewpoint.startY,
                    });
                    await world.wait(1500);
            
                    let chat = "objective2_2_schemaseeds_pre";
                    worldState.Bias.conversations.ele.current = "none";
                    processConversationEvents(event, world, worldState, chat);

                    /*setupConversation(world, worldState, "ele_"+chat)
                    worldState['Bias']['conversations']['ele'][chat]['current'] = "none";
                    worldState['Bias']['conversations']['ele'][chat]['complete'] = true;
                    worldState.Bias.conversations.ele.current = "none";*/
            
                    await world.tweenCameraToPlayer();
            
                    world.enablePlayerMovement();
                });
            }
        }
    }

}

module.exports = {
    viewpointEvent
}