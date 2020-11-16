const router = require("express").Router();
const { authUser } = require("../middleware/auth");
const {
    showFavourites,
    addFavourite,
    deleteFavourite,
} = require("../service/favourite");

//get user favourites
router.get("/", authUser, showFavourites);

//add new favourite to user account
router.post("/", authUser, addFavourite);

//delete favourite from user account
router.delete("/:productId", authUser, deleteFavourite);

module.exports = router;
