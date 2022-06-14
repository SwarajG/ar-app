import mongoose from 'mongoose';
const { Schema } = mongoose;

interface Product {
  id: string,
  name: string,
  size: string,
  lang: string,
  crmURL: string,
  variant: {
    name: string,
    size: string,
    modelURL: string,
    productImageURL: string,
  },
  reviews: [
    {
      id: string,
      head: string,
      name: string,
      age: string,
      rating: number,
      review: string,
    },
  ],
  moreReviews: {
    url: string,
  },
  ingredients: {
    head: string,
    list: string,
    disclaimer: string,
  },
  ceramides: [
    {
      id: string,
      title: string,
      description: string,
    },
  ],
  efficacy: {
    head: string,
    url: string,
  },
  howToApply: {
    head: string,
    url: string,
    steps:[
      {
        description: string,
      },
    ],
    textureImage1URL: string,
    textureImage2URL: string,
  },
  frequentlyBT: {
    url1: string,
    url2: string,
    url3: string,
    product1url: string,
    product2url: string,
    product3url: string,
  },
}

const productSchema = new Schema<Product>({
  id: String,
  name: String,
  size: String,
  lang: String,
  crmURL: String,
  variant: {
    name: String,
    size: String,
    modelURL: String,
    productImageURL: String,
  },
  reviews: [
    {
      id: String,
      head: String,
      name: String,
      age: String,
      rating: Number,
      review: String,
    },
  ],
  moreReviews: {
    url: String,
  },
  ingredients: {
    head: String,
    list: String,
    disclaimer: String,
  },
  ceramides: [
    {
      id: String,
      title: String,
      description: String,
    },
  ],
  efficacy: {
    head: String,
    url: String,
  },
  howToApply: {
    head: String,
    url: String,
    steps:[
      {
        description: String,
      },
    ],
    textureImage1URL: String,
    textureImage2URL: String,
  },
  frequentlyBT: {
    url1: String,
    url2: String,
    url3: String,
    product1url: String,
    product2url: String,
    product3url: String,
  },
});

export default productSchema;
export { Product, productSchema };