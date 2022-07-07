import express, { Router, Request, Response } from 'express';
import { getProduct, setProduct } from '../controller/productController';
import { languageText } from './language';
import { dashboardData } from '../const/dashboardData';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { product } = req.query;
  res.render('index', { product });
});

router.get('/product', async (req: Request, res: Response) => {
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

router.post('/product', async (req: Request, res: Response) => {
  const productData = await setProduct(req.body);
  res.json(productData);
});

export default router;
