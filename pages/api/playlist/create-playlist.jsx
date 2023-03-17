import nc from "next-connect";
import { createPlaylist } from "../../../controllers/playlistController";
import connectDb from "../../../middleware/connectDatabase";
import { authenticateUser } from "../../../middleware/auth";

const router = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

router.use(connectDb).use(authenticateUser).post(createPlaylist);

export default router;
