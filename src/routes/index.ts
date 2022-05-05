import express, { Router, Request, Response } from 'express';
import { getProduct } from '../controller/productController';
import { languageText } from './language';
import { dashboardData } from '../const/dashboardData';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { product } = req.query;
  res.render('index', { product });
});

router.get('/product', async (req: Request, res: Response) => {
  const { product = '', size = '', language = 'en' } = req.query;
  const query = {
    id: String(product),
    size: String(size),
    lang: String(language),
  };
  const productData = await getProduct(query);
  res.render('product', {
    data: {
      dashboardData,
      language,
      languageText: languageText[language.toString()],
      productData: productData,
    },
  });
});

router.post('/product', (req: Request, res: Response) => {
  console.log(req.body);
  res.json(req.body);
});

export default router;
