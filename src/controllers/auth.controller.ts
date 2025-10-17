import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email & password are required.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "user already exists.",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedpassword,
        name: name,
      },
    });

    const userResponse = {
      id: newUser.id,
      name: name,
      email: email,
      createdAt: newUser.createdAt,
    };

    return res.status(200).json(userResponse);
  } catch (error) {
    console.log("Registration error: ", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email and password required",
      });
    }

    const loginUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!loginUser) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, loginUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: loginUser.id }, //payload
      process.env.JWT_SECRET!,
      { expiresIn: "3h" } //expiration time
    );

    return res.status(200).json({
      status: "Logged In Successfully!",
      token: token,
    });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
