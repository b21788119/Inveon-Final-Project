import React, { useState, useEffect } from 'react'
import ChatModal from '../Modal/Modal';
import logo from "../../../assets/img/logo.png"
import { Link } from "react-router-dom";
import { MenuData } from "./MenuData";
import NaveItems from "./NaveItems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import svg from '../../../assets/img/svg/cancel.svg'
import logoWhite from '../../../assets/img/logo-white.png'
import mylogo from "../../../assets/img/logo.png"
import svgsearch from '../../../assets/img/svg/search.svg'
import Swal from 'sweetalert2'
import { removeFromFavoriteList,getAllFavorites,
 removeFromBasket,
 getUserBasket} from '../../../app/Actions/Index';
const Header = () => {
    let carts = useSelector((state) => state.shoppingCard.carts);
    let itemCount = useSelector((state) => state.shoppingCard.totalCount);
    let detailsMap = useSelector((state) => state.shoppingCard.detailsMap);
    let favorites = useSelector((state) => state.products.favorites);
    let favoriteProducts = useSelector((state) => state.products.favoriteProducts);
    let user = useSelector((state) => state.user.user);
    let status = useSelector((state) => state.user.status);
    const [click, setClick] = useState(false);
    const history = useNavigate();
    let dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);

    const cartTotal = ()=>{
        var total = 0;
        Array.from(detailsMap.values()).map((data)=>{
            total+= (data.count*data.product.price);

        })
        return total;
    }

    const getNaveItems = () => {
        if (status && user.role !== "Admin") {
          return (
            <>
              {MenuData.map((item, index) => (
                <NaveItems item={item} key={index} />
              ))}
            </>
          );
        } else if (!status) {
          return (
            <>
              {MenuData.map((item, index) => (index !== 3 ? <NaveItems item={item} key={index} /> : null))}
            </>
          );
        } else if (status && user.role === "Admin") {
          return (
            <>
              {MenuData.map((item, index) => (index === 0 ? <NaveItems item={item} key={index} /> : null))}
            </>
          );
        }
      };

    const removeFromTheBasket = (detailsId,productId) => {
        dispatch(removeFromBasket({user:user,cartDetailsId:detailsId,productId:productId}));
    }

    const rmFavProduct = async(id) => {
        dispatch(removeFromFavoriteList({user:user,productId:id,_action:'remove'}));
    }


    const handleClick = () => {
        if (click) {

            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handleWish = () => {
        if (click) {
            document.querySelector("#offcanvas-wishlish").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-wishlish").style = ("transform: translateX(0);")
        }
        setClick(!click);
    }
    const handleSearch = () => {
        if (click) {
            document.querySelector("#search").style = ("transform: translate(-100%, 0); opacity: 0")
        } else {
            document.querySelector("#search").style = ("transform: translate(0px, 0px); opacity: 1")
        }
        const aramaCubugu = document.getElementById('searchDeneme');
        const aramaCubuguIcindekiDeger = String(aramaCubugu.value);
        console.log(aramaCubuguIcindekiDeger);

        setClick(!click);
    }
    const handleabout = () => {
        if (click) {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handlemenu = () => {
        if (click) {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    return (
        
        <div>
            <ChatModal handleShow={handleShow} showModal={showModal} setShowModal={setShowModal} />
            <header className="header-section d-none d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">
                                    <div className="header-logo">
                                        <div className="logo">
                                            <Link to="/"><img  style={{ width: "150px", height: "75px"}}  src={logo}/></Link>
                                        </div>
                                    </div>
                                    {/* Burası menüyü oluşturan bölüm */}
                                    <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {/* MenuData nın içindeki her bir json objesi için li oluşturulur */}
                                                {getNaveItems()}
                                            </ul>
                                        </nav>
                                    </div>
                                    <ul className="header-action-link action-color--black action-hover-color--golden">
                                    <li>
                                            <a type="button" onClick={()=>{setShowModal(true)}} className="offcanvas-toggle" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                   ><i className="fa fa-comment">
                                                    </i></a>
                                        </li>
                                        <li>
                                            {favorites.length
                                                ? <a href="#offcanvas-wishlish" className="offcanvas-toggle"
                                                    onClick={handleWish}><i className="fa fa-heart">
                                                    </i><span className="item-count">{favorites.length}</span></a>
                                                : <a href="#offcanvas-wishlish" className="offcanvas-toggle">
                                                    <i className="fa fa-heart">
                                                    </i><span className="item-count">{favorites.length}</span>
                                                </a>
                                            }
                                        </li>
                                        <li>
                                            {itemCount != 0
                                                ? <a href="#!" className="offcanvas-toggle"
                                                    onClick={handleClick}>
                                                    <i className="fa fa-shopping-bag"></i>
                                                    <span className="item-count">{itemCount}</span></a>
                                                : <a href="#!" className="offcanvas-toggle">
                                                    <i className="fa fa-shopping-bag">
                                                    </i><span className="item-count">{itemCount}</span></a>
                                            }
                                        </li>

                                        <li>
                                            <a href="#offcanvas-about" className="offacnvas offside-about 
                                            offcanvas-toggle" onClick={handleabout}>
                                                <i className="fa fa-bars"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Ekran küçüldüğünde  sticky menu devreye girer başladı  */}
            <div className="mobile-header sticky-header sticky-color--golden 
            mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            {/* Burası ekran  logo  devreye girer  */}
                            <div className="mobile-header-left">
                                <ul className="mobile-menu-logo">
                                    <li>
                                        <Link to="/">
                                            <div className="logo">
                                                <img  style={{ width: "150px", height: "70px"}}  src={mylogo} alt="my basket"/>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Burası ekran  küçüldüğünde devreye girer  */}
                            <div className="mobile-right-side">
                                <ul className="header-action-link action-color--black 
                                action-hover-color--golden">
                                    <li>
                                        <a href="#!" className="search_width" onClick={handleSearch}>
                                            <img src={svgsearch} alt="img" />
                                        </a>
                                    </li>
                                    <li>
                                        {favorites.length
                                            ? <a href="#offcanvas-wishlish" className="offcanvas-toggle"
                                                onClick={handleWish}><i className="fa fa-heart"></i>
                                                <span className="item-count">{favorites.length}</span></a>
                                            : <a href="#offcanvas-wishlish" className="offcanvas-toggle">
                                                <i className="fa fa-heart"></i><span className="item-count">
                                                    {favorites.length}</span></a>
                                        }
                                    </li>
                                    <li>
                                        {carts.length
                                            ? <a href="#!" className="offcanvas-toggle" onClick={handleClick}>
                                                <i className="fa fa-shopping-bag"></i>
                                                <span className="item-count">{carts.length}</span></a>
                                            : <a href="#!" className="offcanvas-toggle">
                                                <i className="fa fa-shopping-bag">
                                                </i><span className="item-count">{carts.length}</span></a>
                                        }
                                    </li>
                                    <li>
                                        <a href="#!" className="offcanvas-toggle offside-menu"
                                            onClick={handlemenu}>
                                            <i className="fa fa-bars"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Ekran küçüldüğünde  sticky menu devreye girer bitti */}
            {/* Burası ekran  küçüldüğünde hamburger menü  devreye girer  */}
            <div id="mobile-menu-offcanvas"
                className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">

                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handlemenu}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-mobile-menu-wrapper">

                    <div className="mobile-contact-info">
                        <div className="logo">
                            <Link to="/"><img  style={{ width: "70px", height: "70px"}}  src={mylogo} alt="my basket"/></Link>
                        </div>
                        <address className="address">
                            <span>Addres: Beylikdüzü / İstanbul</span>
                            <span>Bizi Ulaşın: 0123456789, 0123456789</span>
                            <span>Email: ibr@ibr.com</span>
                        </address>
                        <ul className="social-link">
                            <li>
                                <a href="#!"><i className="fa-brands fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa-brands fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa-brands fa-linkedin"></i></a>
                            </li>
                        </ul>
                        <ul className="user-link">
                            <li><Link to="/wishlist">Favorites</Link></li>
                            <li><Link to="/cart">Shopping List</Link></li>
                            <li><Link to="/checkout-two">Complete Order</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
            {/* Burası ekran büyüdüğünde hamburger menü  devreye girer  */}
            <div id="offcanvas-about"
                className="offcanvas offcanvas-rightside offcanvas-mobile-about-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleabout}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="mobile-contact-info">
                    <address className="address">
                        <img src={logoWhite} alt="logo" />
                        <span>Addres: Beylikdüzü / İstanbul</span>
                        <span>Bizi Ulaşın: 0123456789, 0123456789</span>
                        <span>Email: ibr@ibr.com</span>
                    </address>
                    <ul className="social-link">
                        <li>
                            <a href="#!"><i className="fa-brands fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa-brands fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa-brands fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa-brands fa-linkedin"></i></a>
                        </li>
                    </ul>
                    <ul className="user-link">
                        <li><Link to="/wishlist">Favorites</Link></li>
                        <li><Link to="/cart">Shopping Basket</Link></li>
                        <li><Link to="/checkout-two">Complete Order</Link></li>
                    </ul>
                </div>
            </div>
            {/* Sepet Listesi Popup Başladı  */}
            <div id="offcanvas-add-cart"
                className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleClick}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-add-cart-wrapper">
                    <h4 className="offcanvas-title">Shopping Basket</h4>
                    <ul className="offcanvas-cart">
                        {Array.from(detailsMap.values()).map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-two/${data.product.productId}`}
                                        className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.product.imageUrl} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-two/${data.product.productId}`}
                                            className="offcanvas-wishlist-item-link">{data.product.name}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">
                                                {data.count || 1} x
                                            </span>
                                            <span className="offcanvas-wishlist-item-details-price">
                                                {data.product.price} TL</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas-wishlist-item-delete"
                                        onClick={() => removeFromTheBasket(data.cartDetailsId,data.product.productId)}>
                                        <i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="offcanvas-cart-total-price">
                        <span className="offcanvas-cart-total-price-text">Total :</span>
                        <span className="offcanvas-cart-total-price-value">{cartTotal()}.00 TL</span>
                    </div>
                    <ul className="offcanvas-cart-action-button">
                        <li>
                            <Link to="/cart" className="theme-btn-one btn-black-overlay btn_md">
                                Show Basket</Link>
                        </li>
                        <li>
                            <Link to="/checkout-two" className="theme-btn-one btn-black-overlay btn_md">
                                Complete Order</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Sepet Listesi Popup Bitti  */}
            {/* Favori Listesi Popup Başladı  */}
            <div id="offcanvas-wishlish" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleWish}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-wishlist-wrapper">
                    <h4 className="offcanvas-title">Favorites</h4>

                    <ul className="offcanvas-wishlist">
                        {favoriteProducts.map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-one/${data.productId}`}
                                        className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.productDto.imageUrl} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-one/${data.productId}`}
                                            className="offcanvas-wishlist-item-link">{data.productDto.name}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x
                                            </span>
                                            <span className="offcanvas-wishlist-item-details-price">
                                                {data.productDto.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas-wishlist-item-delete"
                                        onClick={() => rmFavProduct(data.productId)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="offcanvas-wishlist-action-button">
                        <li>
                            <Link to="/wishlist" className="theme-btn-one btn-black-overlay btn_md">
                                Favorites List</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Favori Listesi Popup Bitti  */}
            <div id="search" className="search-modal">
                <button type="button" className="close" onClick={handleSearch}><img src={svg} alt="icon" />
                </button>
                <form onSubmit={(e) => {
                    e.preventDefault(); handleSearch();
                    Swal.fire('Success', 'Sonuçlara göz atın', 'success'); history('/shop/shop-left-sidebar');
                }}>
                    <input type="search" placeholder="Ürün adı, markası." required id='searchDeneme' />
                    <button type="submit" className="btn btn-lg btn-main-search">Search</button>
                </form>
            </div>
        </div>
    )
}
export default Header