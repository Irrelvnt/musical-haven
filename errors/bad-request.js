import { StatusCodes } from "http-status-codes";

function BadRequestError(res, message) {
  return res.status(StatusCodes.BAD_REQUEST).json({ message });
}

export default BadRequestError;
