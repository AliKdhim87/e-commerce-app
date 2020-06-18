import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
connectDb();
export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'POST':
      await handlePostRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  let product;
  try {
    product = await Product.findOne({ _id });
    if (!product)
      return res
        .status(404)
        .json({ error: 'There is not product for the provide id.' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'something went wrong!' });
  }
}

async function handlePostRequest(req, res) {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send('Product missing one or more fields');
    }
    const product = new Product({
      name,
      price,
      description,
      mediaUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Something went wrong!');
  }
}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;

  try {
    await Product.findOneAndDelete({ _id });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'something went wrong!' });
  }
}
