import { loginService } from "../services";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { CODE_ERROR } from "../constants";
import { failure, success } from "../utils";
import type { IUser } from "../types";

export async function login(req: any, res: any) {
  try {
    const { email, password } = req.body;

    const admin = await loginService(email);

    if (!admin) {
      return res
        .status(400)
        .json(
          failure(
            400,
            CODE_ERROR[400],
            "Такого пользователя не существует или неверный пароль",
          ),
        );
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!isValidPassword) {
      return res
        .status(400)
        .json(
          failure(
            400,
            CODE_ERROR[400],
            "Такого пользователя не существует или неверный пароль",
          ),
        );
    }

    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "30d" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // чтобы куки передавались только по HTTPS в продакшене
      sameSite: "strict", // куки будут отправляться только на тот же домен, что и фронтенд как я понял
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(success(null));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function refresh(req: any, res: any) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(400)
      .json(
        failure(400, CODE_ERROR[400], "Рефреш токен невалиден или его нет"),
      );
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" },
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json(success(null));
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json(failure(401, CODE_ERROR[401], "Не авторизован"));
  }
}

export async function logout(req: any, res: any) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json(success(null));
}

export async function getMe(req: any, res: any) {
  return res.status(200).json(success<IUser>(req.user));
}
