import { StatusCodes } from "http-status-codes";

function NotFoundError(res, message) {
  return res.status(StatusCodes.NOT_FOUND).json({ message });
}

export default NotFoundError;
