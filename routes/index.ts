const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { product } = req.query;
  res.render('index', { product });
});

export default router;
