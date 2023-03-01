import nc from "next-connect";
import { recommendPlaylist } from "../../../controllers/playlistController";

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
  //.use(authenticateUser)
  .get(recommendPlaylist);

export default router;
