import ProductModel from "../model/ProductModel";
import bcryptjs from "bcryptjs";

export const CreateProductSV = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      price,
      description,
      categories,
      image,
      countInStock,
      rating,
      discount,
      selled,
      gallery,
    } = newProduct;
    try {
      const checkProduct = await ProductModel.findOne({ name });
      if (checkProduct != null) {
        resolve({
          status: "OK",
          message: "The name of product is already",
        });
      }

      const data = await ProductModel.create({
        name,
        price,
        description,
        categories,
        image,
        countInStock,
        rating,
        discount,
        selled,
        gallery,
      });

      resolve({
        status: "OK",
        message: "Create Product successfully",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const UpdateProductSV = (id, newProduct) => {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await ProductModel.findOne({ id });
      if (checkProduct != null) {
        resolve({
          status: "OK",
          message: "The  product is not defined",
        });
      }

      const data = await ProductModel.findByIdAndUpdate(id, newProduct, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Update Product successfully",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getProductByIdSV = (id) => {
  //   console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await ProductModel.findOne({ _id: id });
      // console.log(checkUser);
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }
      const data = await ProductModel.findOne({ _id: id });
      //   console.log("data", data);

      resolve({
        status: "OK",
        message: "Get Product by id successfully",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteProductSV = (id) => {
  // console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await ProductModel.findOne({ _id: id });
      // console.log(checkUser);
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }
      const data = await ProductModel.findOneAndDelete({ _id: id });

      resolve({
        status: "OK",
        message: "Delete Product by id successfully",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllProductSV = (limit, page, sort, filter) => {
  // console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await ProductModel.countDocuments();
      if (filter) {
        const label = filter[0];
        const dataSort = await ProductModel.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });

        resolve({
          status: "OK",
          message: "get   Product successfully",
          dataSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPages: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const dataSort = await ProductModel.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);

        resolve({
          status: "OK",
          message: "get   Product successfully",
          dataSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPages: Math.ceil(totalProduct / limit),
        });
      }
      const dataAll = await ProductModel.find()
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "OK",
        message: "get All Product successfully",
        dataAll,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPages: Math.ceil(totalProduct / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};
