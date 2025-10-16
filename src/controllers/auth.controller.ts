import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

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
  res.json({
    status: "login page",
  });
};
