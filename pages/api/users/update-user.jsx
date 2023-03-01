// pages/api/hello.js
import nc from "next-connect";
import {
  updateUser,
  getSingleUser,
} from "../../../../controllers/userController";
import {
  authenticateUser,
  authorizePermissions,
} from "../../../../middleware/auth";
import connectDb from "../../../../middleware/connectDatabase";

const router = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

router
  .use(connectDb)
  .use(authenticateUser)
  .use(authorizePermissions("admin"))
  .get(getSingleUser)
  .patch(updateUser);

export default router;