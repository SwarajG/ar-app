import { model } from 'mongoose';
import { productSchema, Product } from '../schema/product';

const Product = model<Product>('Product', productSchema);

export const getProduct = async ({
  name,
  lang,
  size,
}: {
  name: string;
  lang: string;
  size: string;
}) => {
  const product = await Product.findOne({ name, size, lang });
  return product;
};

export const setProduct = async (data: Product) => {
  const NewProduct = new Product(data);
  const product = await NewProduct.save();
  return product;
};
