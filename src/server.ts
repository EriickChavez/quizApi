import app from "./app";
import { connectMongoDB } from "./config/db";
import { ENV } from "./config/ENV";
import logger from "./middleware/logger";

const PORT = ENV.PORT;

const startServer = async () => {
  // await connectMySQL();
  await connectMongoDB();
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer();
