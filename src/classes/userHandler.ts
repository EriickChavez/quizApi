import jwt from "jsonwebtoken";
import sql from "../db/db";
import runtime from "../runtime/runtime";
require("dotenv").config();

/**
 * UserHandler class to handle user registration and login.
 */
class UserHandler {
  private jwtSecret: string;
  private saltRounds: number;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
    this.saltRounds = 10;
  }

  /**
   * Register a new user with a username and password.
   * @param {string} username - The username of the user. It must have the 'unique' constraint in the database to avoid duplicates.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} - A promise that resolves to a JWT token.
   * @throws {Error} - If the registration fails.
   * @example
   * const token = await userHandler.registerUser('testuser', 'testpassword');
   */
  async registerUser(username: string, password: string): Promise<string> {
    const hashedPassword = await runtime.hash(password, this.saltRounds);
    const result = await sql.functions.insertRow("users", {
      username,
      password: hashedPassword,
    });
    if (result.affectedRows === 0) throw new Error("Failed to register user");

    const token = jwt.sign(
      { id: process.env.HIDE_USERID ? null : result.insertId, username },
      this.jwtSecret,
      { expiresIn: "7d" }
    );
    return token;
  }

  /**
   * Log in a user with a username and password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} - A promise that resolves to a JWT token.
   * @throws {Error} - If the login fails.
   * @example
   * const token = await userHandler.loginUser('testuser', 'testpassword');
   */
  async loginUser(username: string, password: string): Promise<string> {
    const user = await sql.functions.getRow("users", { username });
    if (user.length === 0) throw new Error("User not found");

    const isMatch = await runtime.compareHash(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: process.env.HIDE_USERID ? null : user.id, username: user.username },
      this.jwtSecret,
      { expiresIn: "7d" }
    );
    return token;
  }

  /**
   * Verify a JWT token. Does not interact with the database to make the verification faster.
   * @param {string} token - The JWT token to verify.
   * @throws {Error} - If the token is invalid.
   * @example
   * const decoded = userHandler.verifyToken('your_jwt_token');
   */
  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}

export default new UserHandler();
