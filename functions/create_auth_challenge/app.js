
const { randomDigits } = require('crypto-secure-random-digit');
const { sendEmail } = require('./services/ses');

const handler = async event => {
    let secretLoginCode;
    if (!event.request.session || !event.request.session.length) {
        // This is a new auth session
        // Generate a new secret login code and mail it to the user
        secretLoginCode = randomDigits(6).join('');
        await sendEmail(event.request.userAttributes.email, secretLoginCode);

    } else {
        // There's an existing session. Don't generate new digits but
        // re-use the code from the current session. This allows the user to
        // make a mistake when keying in the code and to then retry, rather
        // then needing to e-mail the user an all new code again.
        const previousChallenge = event.request.session.slice(-1)[0];
        console.info("Previous challenge: ", previousChallenge);
        secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }

    // This is sent back to the client app
    event.response.publicChallengeParameters = { email: event.request.userAttributes.email };

    // Add the secret login code to the private challenge parameters
    // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };

    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;

    return event;
};

module.exports.handler = handler;