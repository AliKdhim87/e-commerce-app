import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";
function Home({ products }) {
  return <ProductList products={products} />;
}
Home.getInitialProps = async () => {
  const res = await axios.get(`${baseUrl}/api/products`);

  return { products: res.data };
};
export default Home;
