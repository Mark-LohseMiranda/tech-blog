const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll({
    include: [User, Blog],
  })
    .then((dbComments) => {
      if (dbComments.length) {
        res.json(dbComments);
      } else {
        res.status(404).json({ message: "No comments found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.post("/:id", (req, res) => {
  Comment.create({
    body: req.body.body,
    username: req.session.user.username,
    BlogId: req.params.id,
    UserId: req.session.user.id,
  })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  }).then((delComment) => {
    res.json(delComment);
  });
});

module.exports = router;