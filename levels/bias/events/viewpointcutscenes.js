const { processConversationEvents } = require("./conversations");

function viewpointEvent(world, worldState, event) {
    // If the map just loaded:
    if (event.name == "mapDidLoad") {
        // If we're in the cryo room
        if (event.mapName === "cryo") {
            // TODO: criteria to introduce the player to the "LinkedIn NPCs"
            if (!world.isObjectiveCompleted("objective2_2_unconsciousbiaspractice")) {
                    viewpointEventHelper(world, worldState, event, "viewpoint", "objective2_2_unconsciousbiaspractice_pre")
            }
        }
    }
    // If the objective is closed:
    else if (event.name == "objectiveDidClose") {
        if (
            (event.target.objectiveName === 'objective2_5_deepunderstanding') && // Is objective 2.5.1 complete?
            (world.isObjectiveCompleted("objective2_5_deepunderstanding")) &&
            (!world.isObjectiveCompleted("objective2_5_deepmaze")) // TODO: Is objective 2.5.2 deep maze not completed?
        ) {
            viewpointEventHelper(world, worldState, event, "viewpoint_2", "none")
        } else if (
            (event.target.objectiveName === 'objective2_5_deepmaze') && // Is objective 2.5.2 complete?
            (world.isObjectiveCompleted("objective2_5_deepmaze")) && 
            (true) // TODO: Is objective 2.6 not completed?
        ) {
            viewpointEventHelper(world, worldState, event, "viewpoint_3", "objective2_5_deepmaze_post")
        }
    }
}

function viewpointEventHelper(world, worldState, event, viewpointName, conversationName) {
    world.forEachEntities(viewpointName, async (viewpoint) => {
        world.disablePlayerMovement();

        await world.tweenCameraToPosition({
        x: viewpoint.startX,
        y: viewpoint.startY,
        });
        await world.wait(1500);

        if (conversationName !== "none") {
            let chat = conversationName;
            worldState.Bias.conversations.ele.current = "none";
            processConversationEvents(event, world, worldState, chat);
        }

        await world.tweenCameraToPlayer();

        world.enablePlayerMovement();
    });
}

module.exports = {
    viewpointEvent
}