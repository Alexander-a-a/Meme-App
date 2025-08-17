var express = require("express");
var router = express.Router();
const memeStore = require("../services/memeStore");

router.get("/", function (req, res, next) {
  if (!memeStore.isReady()) {
    return res.status(503).send("Loading memes, please refresh in a moment. ");
  }

  const q = (req.query.q || "").trim();
  const memes = q.length > 0 ? memeStore.searchByName(q) : memeStore.getAll();

  const viewedMemeIds = req.session.viewedMemeIds || [];

  res.render("memes", {
    memes,
    q,
    viewedMemeIds,
    isAuthenticated: req.isAuthenticated?.(),
  });
});

router.get("/details", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }
  return  res.redirect("/memes");
});

router.post("/details", (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const { id } = req.body;
  const meme = memeStore.getById(id);

  if (!meme) {
    return res.status(404).send("Meme not found");
  }

  if (!Array.isArray(req.session.viewedMemeIds)) {
    req.session.viewedMemeIds = [];
  }

  if (!req.session.viewedMemeIds.includes(meme.id)) {
    req.session.viewedMemeIds.push(meme.id);
  }

  res.render("meme", { meme });
});

module.exports = router;
