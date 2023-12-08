import React,{ useEffect }  from 'react'
import {Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { checkout, getAllUserOrders } from '../../app/Actions/Index';


const YourOrder = (props) => {
    const history = useNavigate()
    let dispatch = useDispatch();
    let detailsMap = useSelector((state) => state.shoppingCard.detailsMap);
    let orderSuccess = useSelector((state) => state.shoppingCard.lastOrderSuccess);
    let user = useSelector((state) => state.user.user);
    var totalPrice = 0;
    const formReference = props.data;

    const updatePrice = (price)=>{
        totalPrice+=price;
        return "";
    }
    const handleCheckoutClick = () => {
        const formData = new FormData(formReference.current);
        const serializedFormData = Object.fromEntries(formData.entries());
        serializedFormData.OrderTotal = totalPrice+15;
        serializedFormData.DiscountTotal = totalPrice+15;
        const cartHeaderId = [...detailsMap.values()][0].CartHeaderId;
        dispatch(checkout({user:user,cartHeaderId:cartHeaderId,form:serializedFormData}));
    }

    useEffect(() => {
        if(orderSuccess === true){
            history("/order-complete");
        }
        
      },[orderSuccess]);
    

    if(detailsMap.size != 0 ){
        return (
            <>
                <div className="col-lg-6 col-md-6">
                    <h3>Your Order</h3>
    
                    <div className="order_table table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.from(detailsMap.values()).map((data, index) => (
                                <tr>
                                    <td> {data.product.name}<strong> × {data.count}</strong></td>
                                    <td> {data.count * data.product.price}.00 TL{updatePrice(data.product.price)}</td>
                                </tr>    
                            ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Cart Total</th>
                                    <td>{totalPrice}.00 TL</td>
                                </tr>
                                <tr>
                                    <th>Shipping Fee</th>
                                    <td><strong>15.00 TL</strong></td>
                                </tr>
                                <tr className="order_total">
                                    <th>Order Total </th>
                                    <td><strong>{totalPrice+15}.00 TL</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="payment_method">
                        <form >
                            <div className="accordion" id="accordionExample">
                                <div className="payment_area_wrappers">
                                    <div className="heading_payment" id="headingOne">
                                        <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                            <input type="radio" name="payment" id="html" value="HTML" defaultChecked />
                                            <label htmlFor="html">Money Transfer</label>
                                        </div>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="payment_body">
                                            <p>Direct Bank Transfer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment_area_wrappers">
                                    <div className="heading_payment" id="headingTwo">
                                        <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                            <input type="radio" name="payment" id="javascript" value="JavaScript" />
                                            <label htmlFor="javascript">Mobile Banking</label>
                                        </div>
                                    </div>
                                    <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                        <div className="payment_body">
                                            <p>Direct Mobile Transfer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment_area_wrappers">
                                    <div className="heading_payment" id="headingThree">
                                        <div className="collapsed" data-toggle="collapse" data-target="#collapseThree">
                                            <input type="radio" name="payment" id="css" value="JavaScript" />
                                            <label htmlFor="css">Paypal</label>
                                        </div>
                                    </div>
                                    <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                        <div className="payment_body">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
    
                        <div className="order_button pt-3">
            
                            <button onClick={()=>handleCheckoutClick()} className="theme-btn-one btn-black-overlay btn_sm">
                                    Checkout</button>
                        </div>
                    </div>
                </div>
            </>
        ) 
    }
    else{
        return (
            <>
            <div className="col-lg-6 col-md-6">
                <h3>No order found</h3>
            </div>
        </>
        );


    }


    
}

export default YourOrder