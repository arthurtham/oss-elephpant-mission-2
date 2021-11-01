module.exports = async function (helper) {
    const {answer1} = helper.validationFields;

    if (answer1 === "false") {
        return helper.fail(`
            Hmm, that's not the correct answer. Re-read the question and try again!
        `);
    }

    return helper.success(`
    Nice answer! You've solved the puzzle at this fallacy station!
    `)
};
