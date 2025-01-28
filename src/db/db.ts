//reads env vars and decides which database to use

export default process.env.DBTYPE === "postgres"
  ? require("postgres")
  : require("mysql2");
