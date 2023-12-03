// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector, useDispatch}  from "react-redux";
import TopHeader from "../components/Common/Header/TopHeader";
import Header from "../components/Common/Header";
import FashionBanner from "./Fashion/Banner";
import BannerBottom from "./Fashion/BannerBottom";
import HotProduct from "./Fashion/HotProduct";
import Footer from "../components/Common/Footer";
import ChatModal from "../components/Common/Modal/Modal";
import { getAllFavorites, getAllProducts, getProductByID, getProductsByCategoryü,getUserBasket } from "../app/Actions/Index";

const Fashion = () => {
    let dispatch = useDispatch();
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);
    let favorites = useSelector((state) => state.products.favoriteProducts);
   

    useEffect(() => {
        if(status && favorites.length === 0)
        {
            dispatch(getAllFavorites(user))
            dispatch(getUserBasket(user));
        }
     
      },[dispatch]);
    return(
        <div>
            <TopHeader />
            <Header />
            <FashionBanner />
            <BannerBottom />
            <HotProduct />
            <Footer />
        </div>
    )
}
export default Fashion