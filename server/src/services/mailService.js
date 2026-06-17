import nodemailer from "nodemailer";

import { env } from "../config/env.js";

/*
|--------------------------------------------------------------------------
| SMTP Debug Logs
|--------------------------------------------------------------------------
*/

console.log("SMTP HOST:", env.smtpHost);
console.log("SMTP PORT:", env.smtpPort);
console.log("SMTP USER:", env.smtpUser);
console.log("SMTP PASS EXISTS:", !!env.smtpPass);
console.log("EMAIL FROM:", env.emailFrom);

/*
|--------------------------------------------------------------------------
| Mail Transporter
|--------------------------------------------------------------------------
*/

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: Number(env.smtpPort),
  secure: false,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

/*
|--------------------------------------------------------------------------
| Send Email
|--------------------------------------------------------------------------
*/

export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from: env.emailFrom,
    to,
    subject,
    html,
  });
};