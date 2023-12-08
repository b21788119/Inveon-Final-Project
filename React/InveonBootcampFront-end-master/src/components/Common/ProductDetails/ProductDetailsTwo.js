import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useEffect } from "react"
import { useSelector, useDispatch }  from "react-redux";
import { getProductByID,addNewFavorite,removeFromFavoriteList,addToMyBasket,updateBasket} from "../../../app/Actions/Index";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";

const ProductDetailsTwo = () => {
    let dispatch = useDispatch();
    const productId = useParams();
    const product_id = productId.id;
    let favoriteProducts = useSelector((state) => state.products.favoriteProducts);
    let favoriteProductIds = useSelector((state) => state.products.favorites);
    let user = useSelector((state) => state.user.user);
    let products = useSelector((state) => state.products.products);
    let product = products.filter(product=>product.productId == parseInt(product_id))[0];
    let shoppingCard = useSelector((state) => state.shoppingCard.detailsMap);
    const currentCount = shoppingCard.get(parseInt(product_id)) ? shoppingCard.get(parseInt(product_id)).count : 1;

    const [count, setCount] = useState(currentCount);
    const incNum = () => {
        setCount(count + 1)
    }

    const decNum = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            alert("Stokta Yok!")
            setCount(0)
        }
    }
    

    // Add to cart
    const addToCart = async () => {
        var cartDto;
        cartDto = shoppingCard.get(product.productId);
        if(cartDto){
            console.log("güncelleme");
            const currentCart = shoppingCard.get(product.productId);
            
            const difference = (count-currentCart.count);
            let cartHeader = {
                CartHeaderId: currentCart.cartHeaderId,
                UserId: user.user_id,
                CouponCode: "null"
              };
              let cartDetails = [
                {
                  CartDetailsId: currentCart.cartDetailsId,
                  CartHeader:cartHeader,
                  CartHeaderId: currentCart.cartHeaderId,
                  Product: product,
                  ProductId: product.productId,
                  Count: difference,
                }
              ];
              console.log(cartDetails);
              let cartDtoFinal = {
                CartHeader: cartHeader,
                CartDetails: cartDetails
              };
              console.log("details")
              console.log(cartDetails);
              dispatch(updateBasket(cartDtoFinal));

        }
        else{
            console.log("ekleme");
            dispatch(addToMyBasket({user:user,product:product,count:count}));
        }
    }

    const isFavorite = () =>{
        return favoriteProductIds.includes(parseInt(product_id));
    }

    const getStyle = () => {
        return isFavorite() ? {backgroundColor : "#f79837",color:"white"} : {backgroundColor : "",color:"black"};

    }

    const addToFavorites = async(id) => {
        dispatch(addNewFavorite({user:user,productId:id,_action:'add'}));
    }

    const removeFromFavorites = async(id) => {
        dispatch(removeFromFavoriteList({user:user,productId:id,_action:'remove'}));
    }


    let settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <>{product
            ?
            <section id="product_single_two" className="ptb-100">
                <div className="container">
                    <div className="row area_boxed">
                        <div className="col-lg-4">
                            <div className="product_single_two_img slider-for">
                                <Slider {...settings}>
                                    <div className="product_img_two_slider">
                                        <img src={product.imageUrl} alt="img" />
                                    </div>
                                    <div className="product_img_two_slider">
                                        <img src={product.imageUrl} alt="img" />
                                    </div>
                                    
                                </Slider>
                            </div>

                        </div>
                        <div className="col-lg-8">
                            <div className="product_details_right_one">
                                <div className="modal_product_content_one">
                                    <h3>{product.name}</h3>
                                    <div className="reviews_rating">
                                        <RatingStar maxScore={5} rating={5} id="rating-star-common-2" />
                                        <span>({123} Customer Comments)</span>
                                    </div>
                                    <h4>{product.price}.00 TL <del>{parseInt(product.price) + 20}.00 TL</del> </h4>
                                    <p>{product.description}</p>
                                   
                                    
                                    <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={decNum}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control" type="number" value={count} readOnly />
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={incNum}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="links_Product_areas">
                                        <ul>
                                            <li>
                                                <button style={getStyle()} className="action wishlist" title="Wishlist" onClick={isFavorite() ? () => removeFromFavorites(parseInt(product_id)) : ()=>addToFavorites(parseInt(product_id))}><i
                                                    className="fa fa-heart"></i> {isFavorite() ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                                            </li>
                                         
                                        </ul>
                                        <a href="#!" className="theme-btn-one btn-black-overlay btn_sm"
                                         onClick={() => addToCart(product.productId)}>Add To Cart</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductInfo />
                </div>
            </section>
            :
            <div className="container ptb-100">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <h2>Product Is Not Found</h2>
                            <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
            <RelatedProduct />
        </>
    )
}

export default ProductDetailsTwo