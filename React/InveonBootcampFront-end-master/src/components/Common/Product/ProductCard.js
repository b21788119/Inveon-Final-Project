import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
import { removeFromFavoriteList, addNewFavorite,addToMyBasket } from "../../../app/Actions/Index";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ProductCard = (props) => {
    let dispatch=  useDispatch();
    // Fetching current user from the store
    let user = useSelector((state) => state.user.user);
    // Fetching the favorite products from the product slice
    let favoriteProducts = useSelector((state) => state.products.favorites);
    // Deciding if the current product is in the favorite list
    
    
    const addToBasket = async() => {
        dispatch(addToMyBasket({user:user,product:props.data,count:1}));
        
    }

    const isFavorite = () =>{
        return favoriteProducts.includes(props.data.productId);
    }

    const getStyle = () => {
        return isFavorite() ? {backgroundColor : "#f79837",color:"white"} : {backgroundColor : "",color:"#f79837"};

    }
    
    const addToFavorites = async(id) => {
        dispatch(addNewFavorite({user:user,productId:id,_action:'add'}));
    }

    const removeFromFavorites = async(id) => {
        dispatch(removeFromFavoriteList({user:user,productId:id,_action:'remove'}));
    }

    
    return(
        <>
         <div className="product_wrappers_one">
            <div className="thumb">
                <Link to={`/product-details-two/${props.data.productId}`} className="image">
                    <img  src={props.data.imageUrl} alt={props.data.name}></img>
                    <img className="hover-image" src={props.data.imageUrl} alt={props.data.name} />
                </Link>
                <span className="badges">
                    <span className={(['yaz','yeni','satışta'][Math.round(Math.random()*2)])} >
                        {props.data.categoryName}
                    </span>
                </span>
                <div className="actions">
                    <button style = {getStyle()} className="action wishlist" title="Add to Favorites" onClick={isFavorite() ? () => removeFromFavorites(props.data.productId) : ()=>addToFavorites(props.data.productId)
                    }><AiOutlineHeart/>
                    </button>
                </div>
                <button type="button" className="add-to-cart offcanvas-toggle" onClick={()=>addToBasket()}>
                    Add to Cart
                </button>
             </div>
             <div className="content">
                <h5 className="title">
                    <Link to={`/product-details-two/${props.data.productId}`}>{props.data.name}</Link>
                </h5>
                <span className="price">
                    <span className="new">{props.data.price}.00 TL</span>
                </span>
             </div>
               
            </div>
        </>
    )
}

export default ProductCard