const express = require('express');
const { getProduct, setProduct } = require('../controller/productController');
const { languageText } = require('./language');
const { dashboardData } = require('../const/dashboardData');

const router = express.Router();

router.get('/', (req, res) => {
  const { product } = req.query;
  res.render('index', { product });
});

router.get('/product', async (req, res) => {
  const { name = '', size = '', lang = 'en' } = req.query;
  const query = {
    name: String(name),
    size: String(size),
    lang: String(lang),
  };
  const productData = await getProduct(query);
  res.render('product', {
    data: {
      dashboardData,
      language: lang,
      languageText: languageText[lang.toString()],
      productData: productData,
    },
  });
});

router.post('/product', async (req, res) => {
  const productData = await setProduct(req.body);
  res.json(productData);
});

module.exports = router;
