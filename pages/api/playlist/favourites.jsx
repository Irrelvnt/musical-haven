import nc from "next-connect";
import { updateFavourites } from "../../../controllers/playlistController";
import connectDb from "../../../middleware/connectDatabase";

const router = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

router.use(connectDb).post(updateFavourites);

export default router;
