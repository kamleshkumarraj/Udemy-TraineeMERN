import {createTransport} from 'nodemailer'

const transporter = createTransport({
  service : "gmail",
  auth : {
    user : process.env.SENDER_EMAIL,
    pass : process.env.SENDER_PASSWORD
  },
  host : "smtp.gmail.com",
  port : 587,
  secure : true
})

export const sendMail = async ({message, subject, to}) => {
  const mailOptions = {
    from : process.env.SENDER_EMAIL,
    to,
    subject,
    html : message
  }

  await transporter.sendMail(mailOptions);
}