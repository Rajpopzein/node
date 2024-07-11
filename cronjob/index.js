const cron = require('node-cron');
const nodemailer = require('nodemailer');

function sendEmail() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  let mailOptions = {
    from: 'raj@gmail.com',
    to: 'to@example.com',
    subject: 'Scheduled Email Notification',
    text: 'scheduled task using node-cron.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

cron.schedule('0 8 * * *', () => {
  console.log('Running a task at 8:00 AM every day');
  sendEmail();
});


//this code will trigers cron email every day at 8AM