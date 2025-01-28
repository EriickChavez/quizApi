import bcrypt from "bcryptjs";
import { promises as fs } from "fs";

interface Runtime {
  hash(input: string, iterations: number): Promise<string>;
  compareHash(s: string, hash: string): Promise<boolean>;
  readFileString(filepath: string): Promise<string>;
}

const runtime: Runtime = {
  /**
   * Hashes an inputted string
   * @param {string} input
   * @param {number} iterations
   * @returns {Promise<string>} hashed input
   */
  async hash(input: string, iterations: number): Promise<string> {
    return await bcrypt.hash(input, iterations);
  },

  /**
   * Compares a given string value to a given hash
   * @param {string} s
   * @param {string} hash
   * @returns {Promise<boolean>} matches
   */
  async compareHash(s: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(s, hash);
  },

  /**
   * Reads in a file asynchronously as text
   * @param {string} filepath
   * @returns {Promise<string>} file contents
   */
  async readFileString(filepath: string): Promise<string> {
    return await fs.readFile(filepath, "utf-8");
  },
};

export default runtime;
