import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const TotalCart = (props) => {
    let carts = useSelector((state) => state.shoppingCard.detailsMap);


    const calculateTotal = ()=>{
        var total = 0;
        Array.from(carts.values()).forEach(detail => {
            total+= (detail.product.price * detail.count);
            
        });
        return total;
    }

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }
    return (
        <>
            {props.fullGrid ? (
                <div className="col-lg-9">
                    <div className="table thead">
                        <h3>Total : </h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Sub Total : </p>
                                <p className="cart_amount">${calculateTotal()}.00</p>
                            </div>
                            <div className="cart_subtotal ">
                                <p>Shipping Fee : </p>
                                <p className="cart_amount"><span>Fixed Price:</span> 15 TL</p>
                            </div>

                            <div className="cart_subtotal">
                                <p>Total : </p>
                                <p className="cart_amount">${calculateTotal()+15}.00</p>
                            </div>
                            <div className="checkout_btn">

                                <Link to="/checkout-one" className="theme-btn-one btn-black-overlay btn_sm">
                                    Complete Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-lg-9">
                       <div className="coupon_code right">
                        <h3>Total : </h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Sub Total : </p>
                                <p className="cart_amount">{calculateTotal()}.00 TL</p>
                            </div>
                            <div className="cart_subtotal ">
                                <p>Shipping Fee :</p>
                                <p className="cart_amount"><span>Fixed Price :</span> 15 TL</p>
                            </div>
                    

                            <div className="cart_subtotal">
                                <p>Total :</p>
                                <p className="cart_amount">{calculateTotal()+15}.00 TL</p>
                            </div>
                            <div className="checkout_btn">

                                <Link to="/checkout-two" className="theme-btn-one btn-black-overlay btn_sm">
                                    Complete Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TotalCart
