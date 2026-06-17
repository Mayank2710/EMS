import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log("\n=================================");
      console.log(`🚀 ${env.appName} Server Started`);
      console.log(`🌍 Environment : ${env.nodeEnv}`);
      console.log(`📡 Port        : ${env.port}`);
      console.log("=================================\n");
    });
  } catch (error) {
    console.error("❌ Server Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();