import { StatusCodes } from "http-status-codes";

function UnauthorizedError(res, message) {
  return res.status(StatusCodes.FORBIDDEN).json({ message });
}

export default UnauthorizedError;
