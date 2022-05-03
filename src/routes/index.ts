import express, { Router, Request, Response } from 'express';
import { languageText } from './language';
import { dashboardData } from '../const/dashboardData';
import { data as data1 } from './__mock__/data';
import { data as data2} from './__mock__/data2';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { product } = req.query;
  res.render('index', { product });
});

router.get('/product', (req: Request, res: Response) => {
  const { product, size, language = 'en' } = req.query;
  const response = (() => {
    if (product === 'hydrating-cleanser') {
      return data1;
    } else if (product === 'moisturizing-cream') {
      return data2;
    }
  })();

  res.render('product', {
    data: {
      dashboardData,
      language,
      languageText: languageText[language.toString()],
      productData: response,
    },
  });
});

export default router;
