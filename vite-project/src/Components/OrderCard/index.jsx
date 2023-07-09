import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line react/prop-types
const OrderCard = ({ id, title, imageUrl, price, handleDelete }) => {
  OrderCard.propTypes = {
    id: PropTypes.node.isRequired, 
    title: PropTypes.node.isRequired, 
    imageUrl: PropTypes.node.isRequired, 
    price: PropTypes.node.isRequired,
  }
  let renderXMarkIcon;
  if (handleDelete) {
    renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className='h-6 w-6 text-black cursor-pointer'></XMarkIcon>
  }
  return (
    <div className='flex justify-between items-center mb-3'>
      <div className='flex items-center gap-2'>
        <figure className='h-20 w-20'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
          <p className='text-sm font-light'>{title}</p>
      </div>
      
      <div className='flex items-center gap-2'>
        <p className='text-lg font-medium'>{price}</p>
        {renderXMarkIcon}
      </div>
      
    </div>
  );
}

export default OrderCard;