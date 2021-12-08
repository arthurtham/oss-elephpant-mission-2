
function keywordsHelper(answer, library, captionState, foundText, foundEmptyText, notFoundText, notFoundEmptyText) {
    answer = answer.toLowerCase().replace(/[^0-9a-z]/gi, " ");
    var answerTokens = answer.split(" ");
    answerTokens = [...new Set(answerTokens)];

    console.log(answerTokens);

    var matchesFound    = [];
    var matchesNotFound = [];

    library.forEach(token => {
        if (answerTokens.includes(token)) {
        matchesFound.push(token);
        } else {
        matchesNotFound.push(token);
        }
    })

    console.log(matchesFound);
    console.log(matchesNotFound);

    var captionFoundText;
    var captionNotFoundText;

    if (matchesFound.length === 0) {
        captionFoundText = foundEmptyText;
    } else {
        captionFoundText = foundText+ ": " + matchesFound.join(", ")+".";
    }
    
    if (matchesNotFound.length === 0) {
        captionNotFoundText = notFoundEmptyText;
    } else {
        captionNotFoundText = notFoundText + ": " +matchesNotFound.join(", ")+".";
    }

    captionState.captionFoundText = captionFoundText;
    captionState.captionNotFoundText = captionNotFoundText;
    return captionState
}

module.exports = keywordsHelper