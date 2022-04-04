import express, { Router, Request, Response } from 'express';
import { menuList } from '../const/product';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { product } = req.query;
  res.render('index', { product });
});

router.get('/product', (req: Request, res: Response) => {
  res.render('product', { data: { menuList } });
});

export default router;
