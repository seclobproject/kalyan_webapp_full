import subProductModel from "../models/subProduct.js";
import { HttpException } from "../exceptions/exceptions.js";
import lodash from "lodash";
import franchiseModel from "../models/franchiseModel.js";
import categoryModel from "../models/categoryModel.js";

import mongoose from "mongoose";
const { toNumber } = lodash;

//----------- add new subproduct----------------

export async function saveSubProduct(productData) {
  const findProduct = await subProductModel.findOne({
    name: { $regex: new RegExp("^" + productData.name + "$", "i") },
  });

  if (findProduct) throw new HttpException(400, "Product already exist ");

  // Check if a product with the same product code already exists
  if (productData.productCode) {
    const findProductByCode = await subProductModel.findOne({
      productCode: {
        $regex: new RegExp("^" + productData.productCode + "$", "i"),
      },
    });

    if (findProductByCode)
      throw new HttpException(
        400,
        "Product with this product code already exists"
      );
  }

  // update the product total prise
//   if (!productData.quantity) {
//     productData.totalPrice = productData.price;
//   } else {
//     productData.totalPrice = productData.price * productData.quantity;
//   }

  const subproduct = await subProductModel.create({
    ...productData,
    quantity: 0,
    stock: [],
  });

  // Find the category by ID and update the products array
//   const category = await categoryModel.findById(
//     productData.category.categoryId
//   );
//   if (!category) throw new HttpException(404, "Category not found");

//   category.products.push(product._id);
//   await category.save();

  return  subproduct ;
}

//---------------------------

//--------- update subproduct --------

export async function subProductUpdate(productId, productData) {
  try {
    if (productData.name) {
      const findProduct = await subProductModel.findOne({
        name: { $regex: new RegExp("^" + productData.name + "$", "i") },
      });
      if (findProduct && findProduct._id.toString() !== productId) {
        throw new HttpException(400, "Product with this name already exists");
      }
    }
      if (productData.productCode) {
        const findProductByCode = await subProductModel.findOne({
          productCode: {
            $regex: new RegExp("^" + productData.productCode + "$", "i"),
          },
        });

        if (findProductByCode && findProductByCode._id.toString() !== productId)
          throw new HttpException(
            400,
            "Product with this product code already exists"
          );
      }
    const subproduct = await subProductModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true }
    );
    if (!subproduct) {
      throw new HttpException(404, "Product not found");
    }

    // Update the franchise stock details
    const franchises = await franchiseModel.find({
      "stock.product.productId": productId,
    });

    for (const franchise of franchises) {
      for (const stockItem of franchise.stock) {
        if (stockItem.productId.toString() === productId) {
          if (productData.name)
            stockItem.productName = productData.name;
          if (productData.productCode)
            stockItem.productCode = productData.productCode;
          if (productData.price) stockItem.price = productData.price;
          // if (productData.category && productData.category.categoryName) {
          //   stockItem.categoryName = productData.category.categoryName;
          // }
        }
      }
      await franchise.save();
    }

    return subproduct;
  } catch (error) {
    throw error;
  }
}
// ----------------------------