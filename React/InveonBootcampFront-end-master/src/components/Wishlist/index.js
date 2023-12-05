import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import img from '../../assets/img/common/empty-cart.png'
import { removeFromFavoriteList } from "../../app/Actions/Index";

const WishArea = () => {
    let dispatch = useDispatch();
    let favoriteProducts = useSelector((state) => state.products.favoriteProducts);
    let user = useSelector((state) => state.user.user);
    
    
    // Remove from Cart
    const removeProduct = (id) => {
        dispatch(removeFromFavoriteList({user:user,productId:id,_action:'remove'}));
    }
    // Clear
    const clearFavoriteList = () => {
        Array.from(favoriteProducts.values()).forEach((product)=>{
            dispatch(removeFromFavoriteList({user:user,productId:product.productId,_action:'remove'}));
    
        })
    }


    return (
        <>
            {favoriteProducts.length
                ?
                <section id="cart_area_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div >
                                    <div className="table_page table-responsive">
                                    <div class="card">
                                        <div class="card-body">

                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th >Remove</th>
                                                        <th >Image</th>
                                                        <th >Product</th>
                                                        <th >Price</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from(favoriteProducts.values()).map((data, index) => (
                                                        <tr key={index}>
                                                            <td className="product_remove">
                                                                <i className="fa fa-trash text-danger" onClick={() => removeProduct(data.productId)} style={{ 'cursor': 'pointer' }}></i>
                                                            </td>
                                                            <td className="product_thumb">
                                                                <Link to={`/product-details-one/${data.productId}`}>
                                                                    <img src={data.productDto.imageUrl} alt="img" />
                                                                </Link>
                                                            </td>
                                                            <td className="product_name">
                                                                <Link to={`/product-details-one/${data.productId}`}>
                                                                    {data.productDto.name}
                                                                </Link>
                                                            </td>
                                                            <td className="product-price">{data.productDto.price}.00 TL</td>

                                                        </tr>
                                                    ))

                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="cart_submit">
                                        {favoriteProducts.length
                                            ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => clearFavoriteList()}>Clear List</button>
                                            : null
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <h2>No Favorites</h2>
                                    <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default WishArea