import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    ShoppingCartProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }
    // Shopping Cart - Increment quantity
    const [count, setCount] = useState(0);
    // Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([]);

    // Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    
    // Product Detail - Show product
    const [productToShow, setProductToShow] = useState({
        title: '',
        price: '',
        description: '',
        images: [],
    });

    // Checkout Side Menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            isCheckoutSideMenuOpen,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}