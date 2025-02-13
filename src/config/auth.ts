import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ENV } from "./ENV";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET!, { expiresIn: "1h" });
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
