import {createTransport} from 'nodemailer'

const transporter = createTransport({
  service : "gmail",
  auth : {
    user : process.env.SENDER_EMAIL,
    pass : process.env.SENDER_PASSWORD
  },
  host : process.env.EMAIL_HOST,
  port : process.env.EMAIL_PORT,
})

export const sendMail = async ({message, subject, to}) => {
  const mailOptions = {
    // we provide send mail with name.

    from : `Auth System <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    html : message
  }

  await transporter.sendMail(mailOptions);
}