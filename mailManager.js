"use strict";
const nodemailer = require("nodemailer");
const config = require('./config.json');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
})};

async function sendEmail(transporter, mailOptions) {
    return transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log('*****Error******* ', err);
        } else {
          console.log('*****Succeded****** ', info.messageId);
        }
    });
}

async function recursiveEmailSend(numEmails, transporter, mailOptions) {

    if(numEmails <= 0) {
        return 'All emails were sent';
    } else {
        await sendEmail(transporter, mailOptions);
        await sleep(1000);
        recursiveEmailSend(numEmails-1, transporter, mailOptions);
    }
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = {user: config.mailTrapUser, pass: config.mailTrapKey}

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        }
    });

    const mailOptions = {
        from: testAccount.user, // Sender address
        to: 'imanolcondeimanol@gmail.com', // List of recipients
        subject: 'Estas muerto', // Subject line
        text: 'Buenas tardes soy batman y te voy a decapitar hijo de puta.', // Plain text body
   };

   const numMails = 100;
   
   await recursiveEmailSend(numMails, transporter, mailOptions);

   transporter.close();
}

main().catch(console.error);
