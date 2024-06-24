//------ add new product ------

import {findSingleSubProduct, getAll, saveSubProduct, subProductUpdate} from '../services/subProduct.service.js'
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


//----- update a subproduct ------

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

//---- get all subProducts ----

export async function getAllSubProduct(req, res, next) {
  try {
    const query = req.query;
    const page = req.query.page;
    const limit = req.query.limit || "10";
    const result = await getAll(page, limit, query);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}


// get single subproduct

export async function getSingleSubProduct(req, res, next) {
  try {
    const productId = req.params.id;
    const result = await findSingleSubProduct(productId);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}