// validate code
const handler = async event => {
    console.log(event.request)
    const validCode = event.request.privateChallengeParameters.secretLoginCode;
    console.log(validCode)
    console.log(event.response)
    event.response.answerCorrect = validCode === event.request.challengeAnswer;
    return event;
};

module.exports.handler = handler;