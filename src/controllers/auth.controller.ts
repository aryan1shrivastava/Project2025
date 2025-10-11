import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  res.json({
    status: "signup page",
  });
};

export const loginUser = async (req: Request, res: Response) => {
  res.json({
    status: "login page",
  });
};
