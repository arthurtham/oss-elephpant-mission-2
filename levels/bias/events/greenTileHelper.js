

function greenTileSetter(world, listOfFlags, key) {
  let _i = 1;
  listOfFlags.forEach(flag => {
    if (flag) {
      world.showEntities(key.toString()+(_i++).toString());
    } else {
      world.hideEntities(key.toString()+(_i++).toString());
    }
    console.log(flag);
  });
}

function greenTileHelper(world, worldState, event) {

  // Change colors of completed deepmaze objects when an objective
  // is completed or the map has loaded
  if (
    (event.name === 'mapDidLoad')
    || (
      (event.name === 'objectiveCompleted' || event.name === 'objectiveCompletedAgain')
    )
  ) {
    // Change tiles to green if the objective is complete
      let deepMaze = worldState.Bias.deepMaze;
      let deepMazeFlags = [
        deepMaze.objective2_5_deepmaze_1,
        deepMaze.objective2_5_deepmaze_2,
        deepMaze.objective2_5_deepmaze_3,
        deepMaze.objective2_5_deepmaze_4,
        deepMaze.objective2_5_deepmaze_5
      ];
      greenTileSetter(world, deepMazeFlags, "deepmaze_green");
      greenTileSetter(world, [deepMaze.canPass], "deepmaze_greenCanPass");
    //TODO: Change pipes for bias simulator pipes
      //greenTileSetter(world, [], "bias_pipe");
  }
}

module.exports = {
  greenTileHelper
};