import React from "react";
import { Link } from "react-router-dom";

import img1 from '../../../assets/img/offer/woman.png';
import img2 from '../../../assets/img/offer/woman1.png';
import img3 from '../../../assets/img/offer/bag.png';
import img4 from '../../../assets/img/offer/woman4.png';
import img5 from '../../../assets/img/offer/kids.png';
import { useSelector } from "react-redux";

const BannerBottom = () => {
    let products = useSelector((state)=>state.products.products);

    const getRandomProduct = () => {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex].imageUrl;
      };

    return (
        <>
            <section id="product_variation_one" className="pt-100">
                <div className="container_fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={getRandomProduct()} alt="img" />
                                <div className="product_var_one_text">
                                    <h4>Elegant</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn-sm">Order Now</Link>
                                </div>
                            </div>
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={getRandomProduct()} alt="img" />
                                <div className="product_var_two_text">
                                    <h4 className="color_one">Captivating</h4>
                                    <h2>The Best</h2>
                                    <h4>Materials</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn-sm">Order Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={getRandomProduct()} alt="img" />
                                <div className="product_var_one_text_center">
                                    <h2 className="color_two">%40 Off</h2>
                                    <h4>For Premium</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn-sm">Shop</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={getRandomProduct()} alt="img" />
                                <div className="product_var_one_text_center">
                                    <h2 className="color_three">Vibrant</h2>
                                    <Link to="/shop" className="theme-btn-one bg-black btn-sm">Order Now</Link>
                                </div>
                            </div>
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={getRandomProduct()} alt="img" />
                                <div className="product_var_one_text_center">
                                    <h2 className="color_four">For Winners</h2>
                                    <h4>Best Offers</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn-sm">Order Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default BannerBottom