const { model } = require('mongoose');
const { productSchema } = require('../schema/product');

const Product = model('Product', productSchema);

const getProduct = async ({
  name,
  lang,
  size,
}) => {
  const product = await Product.findOne({ name, size, lang });
  return product;
};

const setProduct = async (data) => {
  const NewProduct = new Product(data);
  const product = await NewProduct.save();
  return product;
};

module.exports = {
  getProduct,
  setProduct
}