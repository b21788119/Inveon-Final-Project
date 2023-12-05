import React from "react";
import Coupon from './Coupon'
import TotalCart from './TotalCart'
import { Link } from 'react-router-dom'
import img from '../../assets/img/common/empty-cart.png'
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket } from "../../app/Actions/Index";


const CartArea = () => {
    let dispatch = useDispatch();
    let carts = useSelector((state) => state.shoppingCard.detailsMap);
    let user = useSelector((state)=> state.user.user);

    // Remove from Cart
    const removeProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id } });
    }
    // Clear
    const clearCarts = () => {
        Array.from(carts.values()).forEach((cart)=>{
            console.log(cart.productId);
            console.log("here");
            dispatch(removeFromBasket({user:user,cartDetailsId:cart.cartDetailsId,productId:cart.productId}));

        })
    }
    // Value Update
    const cartValUpdate = (val, id) => {
        dispatch({ type: "products/updateCart", payload: { val, id } });
    }

    return (
        <>
            {Array.from(carts.values()).length
                ?
                <section id="cart_area_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product_remove">Remove</th>
                                                    <th className="product_thumb">Picture</th>
                                                    <th className="product_name">Product</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product_quantity">Count</th>
                                                    <th className="product_total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from(carts.values()).map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => removeProduct(data.productId)} style={{ 'cursor': 'pointer' }}></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                            <Link to={`/product-details-one/${data.id}`}>
                                                                <img src={data.product.imageUrl} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={`/product-details-one/${data.productId}`}>
                                                                {data.product.name}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price">{data.product.price}.00 TL</td>
                                                        <td className="product_quantity">
                                                            <input min="1" max="100" type="number" onChange={e => cartValUpdate(e.currentTarget.value, data.product.productId)} defaultValue={data.count || 1} />
                                                        </td>
                                                        <td className="product_total">{data.product.price * (data.count || 1)}.00 TL</td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart_submit">
                                        {Array.from(carts.values()).length
                                            ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => clearCarts()}>Clear Basket</button>
                                            : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <TotalCart />
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <h2>Your Basket Is Empty</h2>
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

export default CartArea