const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", (req, res) => {
  Blog.findAll({
    include: [User, Comment],
  })
    .then((dbBlogs) => {
      if (dbBlogs.length) {
        res.json(dbBlogs);
      } else {
        res.status(404).json({ message: "No blogs found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.post("/", (req, res) => {
  Blog.create({
    title: req.body.title,
    body: req.body.body,
    UserId: req.session.user.id,
  })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  }).then((delBlog) => {
    res.json(delBlog);
  });
});

module.exports = router;
