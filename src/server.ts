import app from "./app";
// import { connectMySQL } from "./config/db";
import logger from "./middleware/logger";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // await connectMySQL();

  app.listen(PORT, () => {
    logger.info(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer();
