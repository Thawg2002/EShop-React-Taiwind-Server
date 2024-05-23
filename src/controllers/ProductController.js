import {
  CreateProductSV,
  UpdateProductSV,
  deleteProductSV,
  getAllProductSV,
  getProductByIdSV,
} from "../server/ProductSevice";

export const createProduct = async (req, res) => {
  try {
    // console.log(req.body);
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
    } = req.body;
    if (
      !name ||
      !price ||
      !description ||
      !categories ||
      !image ||
      !countInStock ||
      !discount ||
      !selled ||
      !rating
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const data = await CreateProductSV(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    // console.log(userId);
    if (!Id) {
      return res.status(200).json({
        status: "ERR",
        message: "The productid is required",
      });
    }
    const data = await UpdateProductSV(Id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    // console.log(userId);
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const data = await getProductByIdSV(productId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // console.log(userId);
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const data = await deleteProductSV(productId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const data = await getAllProductSV(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
