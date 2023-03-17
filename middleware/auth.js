import { UnauthenticatedError, UnauthorizedError } from "../errors";
import { isTokenValid, attachCookiesToResponse } from "../utils";
import { findOne } from "../models/Token";
import { getCookies } from "cookies-next";

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = getCookies({ req, res });

  try {
    if (!refreshToken) {
      return UnauthenticatedError(res, "Invalid");
    }
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return await next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      UnauthenticatedError(res, "Invalid");
    }

    attachCookiesToResponse({
      res,
      req,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    await next();
  } catch (error) {
    return UnauthenticatedError(res, "Invalid");
  }
};

const authorizePermissions =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      UnauthorizedError(res, "Unauthorized to access this route");
    }
    next();
  };

module.exports = {
  authenticateUser,
  authorizePermissions,
};
