import dotenv from "dotenv";

dotenv.config();

export const env = {
  appName: process.env.APP_NAME,

  nodeEnv: process.env.NODE_ENV,

  port: process.env.PORT,

  clientUrl: process.env.CLIENT_URL,

  frontendUrl:
    process.env.FRONTEND_URL,

  mongoUri: process.env.MONGODB_URI,

  jwtAccessSecret:
    process.env.JWT_ACCESS_SECRET,

  jwtAccessExpiresIn:
    process.env.JWT_ACCESS_EXPIRES_IN,

  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET,

  jwtRefreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN,

  smtpHost: process.env.SMTP_HOST,

  smtpPort: process.env.SMTP_PORT,

  smtpUser: process.env.SMTP_USER,

  smtpPass: process.env.SMTP_PASS,

  emailFrom: process.env.EMAIL_FROM,
};