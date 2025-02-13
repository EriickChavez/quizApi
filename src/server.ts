import app from "./app";
import { connectMongoDB } from "./config/db";
import { ENV } from "./config/ENV";
import logger from "./middleware/logger";
import os from "os";

const PORT = ENV.PORT;

const getServerIp = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress = "127.0.0.1"; // Default to localhost
  for (const interfaceName in interfaces) {
    // @ts-ignore
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
  }
  return ipAddress;
};

const startServer = async () => {
  // await connectMySQL();
  await connectMongoDB();
  const ip = getServerIp();
  app.listen(PORT, () => {
    logger.info(`Server is running at http://${ip}:${PORT}`);
  });
};

startServer();
