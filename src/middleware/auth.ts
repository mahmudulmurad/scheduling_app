import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, Secret } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any; // Replace 'any' with the actual type of your user object
}

const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      res.status(404).json({ message: "Token not found" });
      return;
    }

    // decode token
    const splitToken: string | undefined = token.split(" ")[1];
    if (!splitToken) {
      res.status(401).json({ message: "Invalid token format" });
      return;
    }

    const jwtSecret: Secret = process.env.SECRET as Secret;
    jwt.verify(
      splitToken,
      jwtSecret,
      (err: VerifyErrors | null, decode: any) => {
        if (err) {
          res
            .status(401)
            .json({ message: "You have no permissions to access" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export default auth;
