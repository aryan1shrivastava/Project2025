import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getMyProfile = async (req: Request, res: Response) => {
  const email = (req as any).user?.email;
  const userId = (req as any).user?.userId;

  if (!userId) {
    return res.status(401).json({
      error: "UserId missing or invalid",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.status(200).json(user);
};
