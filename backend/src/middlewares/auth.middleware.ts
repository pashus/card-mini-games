import jwt, { type JwtPayload } from "jsonwebtoken";

export async function authMiddleware(req: any, res: any, next: any) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    ) as JwtPayload;

    const { id, email, ...other } = payload;
    req.user = { id, email };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
