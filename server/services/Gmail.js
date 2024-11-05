import nodemailer from 'nodemailer'

// console.log(process.env.SENDER_EMAIL, process.env.SENDER_PASSWORD);

const mailer = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : process.env.SENDER_EMAIL,
    pass : process.env.SENDER_PASSWORD
  }
});

export const sendEmail = async (to, subject, text)=>{
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL, 
      to: to,                       
      subject: subject,             
      text: text,                                   
    };

    // Send the email
    let info = await mailer.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
