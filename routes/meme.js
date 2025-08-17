// var express = require("express");
// var router = express.Router();
// const axios = require("axios");
// const memeStore = require('../services/memeStore');


// router.get("/:id", function (req, res, next) {

//     // Guard
//     if(!req.isAuthenticated || !req.isAuthenticated()) {
//         return res.redirect("/login");
//     }
    
//     const memes = memeStore.getAll()
//     const itemId = req.params.id;
//     const meme = memes.find((m) => m.id === (itemId))

//       const viewedMemes = req.session.viewedMemeIds;

//     if(!req.session.viewedMemeIds.includes(meme.id)) {
//         viewedMemes.push(meme.id);
//         console.log("Meme pushed");
//         console.log(viewedMemes)
//     }

//     if(meme) {
//         res.render("meme", {meme});
//     } else {
//         return res.status(404).send('Meme not found');
//     }

  
  
// });





// module.exports = router;
