import React from "react";
import Header from '../../components/Common/Header';
import Banner from '../../components/Common/Banner';
import ProductDetailsTwos from '../../components/Common/ProductDetails/ProductDetailsTwo'
import Footer from "../../components/Common/Footer";
const ProductDetailsTwo = () => {
    return(
        <>
        <Header />
        <Banner title="Product Detail" />
        <ProductDetailsTwos />
        <Footer />
        </>
    )
}
export default ProductDetailsTwo