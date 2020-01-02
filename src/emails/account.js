const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'benjamin.brkic.a@gmail.com',
    subject: 'Thanks for joining our app! <3',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'benjamin.brkic.a@gmail.com',
    subject: `We are very sorry to see you leave, ${name}`,
    text:
      'Is there anything we could have done to keep you? Feel free to reply with feedback.'
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail
};
