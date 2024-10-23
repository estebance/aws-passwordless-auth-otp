// auto confirm user
const handler = async event => {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyPhone = true;
    event.response.autoVerifyEmail = true;
    return event;
};

module.exports.handler = handler;