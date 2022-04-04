import express, { Router, Request, Response } from 'express';
import { languageText } from '../../public/language';
import { menuList } from '../const/product';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { product } = req.query;
  res.render('index', { product });
});

router.get('/product', (req: Request, res: Response) => {
  const { language = 'en' } = req.query;
  res.render('product', {
    data: { menuList, language, languageText: languageText[language.toString()] },
  });
});

export default router;
