const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('product_view', { title: 'Express' });
});

export default router;
