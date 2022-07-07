const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
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
    steps: [
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

module.exports = { productSchema };
