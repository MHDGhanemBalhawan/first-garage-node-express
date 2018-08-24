const express = require("express");
const router = express.Router();

const comments = require("./api/comments");

router.use("/api/comments", comments);

router.get("/:id?", (req, res) => {
  if (req.params.id) {
    const filter = comments.filter(
      comment => comment.id === parseInt(req.params.id)
    );
    res.status(200).json({ comments: filter });
  } else {
    res.status(200).json({ comments: comments });
  }
  // res.status(200).json(req.body.invoice);
});

router.post("/", (req, res) => {
  // TODO read req.body.customer
  res.status(200).json(req.body.comments);
});

router.put("/", (req, res) => {
  // TODO update per req.body.customer
  res.status(200).json(req.body.comments);
});

router.delete("/", (req, res) => {
  // TODO delete req.body.customer
  res.status(200).json(req.body.comments);
});

module.exports = router;
router.put("/comments", (req, res) => {
  // TODO read req.query.reservationId and req.body.invoice and insert into DB
  res.status(200).json({
    reservationId: req.query.reservationId,
    invoice: req.body.comments
  });
});

module.exports = router;
