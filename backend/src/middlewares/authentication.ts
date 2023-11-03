import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";
import { Request, Response, NextFunction } from "express";
const { secret } = jwtConfig[process.env.NODE_ENV || "development"];

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    var decoded = jwt.verify(token, secret);
    // bind the auth field inside the request
    (req as any).auth = decoded;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

