import nodemailer from 'nodemailer'

const mailUserName = process.env.MAIL_USERNAME
const mailPassword = process.env.MAIL_PASSWORD

export default nodemailer.createTransport({
    host: "smtp.uonsdachurch.co.ke ",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: mailUserName,
      pass: mailPassword,
    }
})