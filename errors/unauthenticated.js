import { StatusCodes } from "http-status-codes";

function UnauthenticatedError(res, message) {
  return res.status(StatusCodes.UNAUTHORIZED).json({ message });
}

export default UnauthenticatedError;
