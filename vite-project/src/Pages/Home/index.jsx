import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";

const Home = () => {
  const [products, setProducts] = useState(null); // cajita donde almacenamos la informacion. Siempre que pensemos en consumo de API pensemos en useEffect
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  return (
    <Layout>
        Home
        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
          {
            products?.map(product => <Card key={product.id} data={product} />)
          }
        </div>
        <ProductDetail />
    </Layout>
  )
}

export default Home;
