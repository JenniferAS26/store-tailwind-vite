import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    ShoppingCartProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }
    // Shopping Cart - Increment quantity
    const [count, setCount] = useState(0);
    // Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([]);
    // Shopping Cart - Order
    const [order, setOrder] = useState([]);

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

    // Get products
    const [products, setProducts] = useState(null); // cajita donde almacenamos la informacion. Siempre que pensemos en consumo de API pensemos en useEffect
    const [filteredProducts, setFilteredProducts] = useState(null); // cajita donde almacenamos la informacion. Siempre que pensemos en consumo de API pensemos en useEffect
    
    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null);
    // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
          .then(response => response.json())
          .then(data => setProducts(data))
    }, []);

    const filteredProductsByTitle = (products, searchByTitle) => {
        return products?.filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredProductsByCategory = (products, searchByCategory) => {
        return products?.filter(product => product.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, products, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredProductsByTitle(products, searchByTitle);
        }
        if (searchType === 'BY_CATEGORY') {
            return filteredProductsByCategory(products, searchByCategory);
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredProductsByCategory(products, searchByCategory).filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if (!searchType) {
            return products;
        }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredProducts(filterBy('BY_TITLE_AND_CATEGORY', products, searchByTitle, searchByCategory));
        if (searchByTitle && !searchByCategory) setFilteredProducts(filterBy('BY_TITLE', products, searchByTitle, searchByCategory));
        if (!searchByTitle && searchByCategory) setFilteredProducts(filterBy('BY_CATEGORY', products, searchByTitle, searchByCategory));
        if (!searchByTitle && !searchByCategory) setFilteredProducts(filterBy(null, products, searchByTitle, searchByCategory));
    }, [products, searchByTitle, searchByCategory]);

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
            order,
            setOrder,
            products,
            setProducts,
            searchByTitle,
            setSearchByTitle,
            filteredProducts,
            searchByCategory,
            setSearchByCategory,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}