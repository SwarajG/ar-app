import express, { Router, Request, Response } from 'express';
import { languageText } from './language';
import { menuList } from '../const/product';
import { data } from './__mock__/data';

const revManifest = require('../../public/assets/rev-manifest');
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { product } = req.query;
  res.render('index', { product, revManifest });
});

router.get('/product', (req: Request, res: Response) => {
  const { language = 'en' } = req.query;
  res.render('product', {
    menuList,
    language,
    languageText: languageText[language.toString()],
    productData: data,
    revManifest,
  });
});

export default router;
