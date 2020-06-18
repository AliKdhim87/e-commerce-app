import connectDb from "../../utils/connectDb";
import Products from "../../models/Product";
connectDb();
export default async (req, res) => {
  let products;
  try {
    products = await Products.find({});
  } catch (error) {
    res.status(500).json(error.message);
  }
  res.status(200).json(products);
};
