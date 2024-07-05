import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// console.log("Mail_Account:", process.env.Mail_Account);
// console.log("Mail_Password:", process.env.Mail_Password);

export const sendEmailCreateOrder = async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      // user: process.env.Mail_Account,
      // pass: process.env.Mail_Password,
      user: "xuanthangg19@gmail.com",
      pass: "xcvbnmmnbvcx10",
    },
  });

  try {
    let info = await transporter.sendMail({
      from: "xuanthangg19@gmail.com",
      to: "thangijr@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    // console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
