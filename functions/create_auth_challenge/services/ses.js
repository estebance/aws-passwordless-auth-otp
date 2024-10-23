const { SendEmailCommand, SESClient } = require("@aws-sdk/client-ses");
const { EMAIL_SENDER_AWS } = require('./constants');

const sesClient = new SESClient();

const setMailTemplate = (code) => {
   return  `
        <!DOCTYPE html>
        <html>
          <body>
            <p>Para verificar tu correo electrónico, utiliza este código:</p>
            <p><h1>${code}</h1></p>
          </body>
        </html>
    `
}

const sendEmail = async (recipient, code) => {
  const mailTemplate = setMailTemplate(code);
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: mailTemplate,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Tu código de verificación para correo electrónico",
      },
    },
    Source: EMAIL_SENDER_AWS,
  });
  try {
    const sesResponse = await sesClient.send(command);
    console.info("SES RESPONSE: ", sesResponse);
    return sesResponse;
  } catch (error) {
    console.error("Error: ", error);
    if (error instanceof Error && error.name === "MessageRejected")
      console.error("Email has been rejected");
    throw error;
  }
};

module.exports = {
  sendEmail,
};