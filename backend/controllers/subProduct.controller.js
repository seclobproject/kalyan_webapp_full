// add new product

import {saveSubProduct, subProductUpdate} from '../services/subProduct.service.js'
export async function createSubProduct(req, res, next) {
  try {
    const subproductData = req.body;
    const subproduct = await saveSubProduct(subproductData);
    res
      .status(200)
      .send({ message: "SubProduct added successfully", subproduct });
  } catch (err) {
    next(err);
  }
}


// update a subproduct

export async function updateSubProduct(req, res, next) {
  try {
    const productData = req.body;
    const productId = req.params.id;
    // const files = req.files;
    const subProduct = await subProductUpdate(productId, productData);

    res
      .status(200)
      .send({ message: "Product updated successfully", subProduct });
  } catch (err) {
    next(err);
  }
}
