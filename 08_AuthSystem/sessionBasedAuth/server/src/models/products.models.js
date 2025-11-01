import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
    },
    warrantyInformation: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: String,
      required: true,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
    },
    images: [],

    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

export const productsModel = mongoose.model('product', productSchema);
