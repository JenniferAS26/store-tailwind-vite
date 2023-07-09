import { useContext } from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';

const Home = () => {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredProducts?.length > 0) {
      return (
        context.filteredProducts?.map(product => (
          <Card key={product.id} data={product} />
        ))
      )
    } else {
        return (
          <div>We do not have anything</div>
        )
    }
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>
      <input 
        type='text'
        placeholder='Search a product'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)} />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home;
