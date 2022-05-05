import { model } from 'mongoose';
import { productSchema, Product } from '../schema/product';

const Product = model<Product>('Product', productSchema);

export const getProduct = async ({
  id,
  lang,
  size,
}: {
  id: string;
  lang: string;
  size: string;
}) => {
  const product = await Product.find({ name: id, lang, size });
  return product;
};
