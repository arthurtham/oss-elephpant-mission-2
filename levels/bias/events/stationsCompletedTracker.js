

function stationsCompletedTracker(stationState, threshold) {
    const listOfStationFlags = stationState.stationFlags;
    stationState.stationsCompleted = Object.values(listOfStationFlags).reduce((a,b) => a+b,0);
    stationState.canPass = stationState.stationsCompleted >= threshold;
    return stationState;
}


module.exports = stationsCompletedTracker;