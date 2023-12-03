import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
    let allOrders = useSelector((state) => state.orders.allUserOrders);
    const calculateTotal = (order)=>{
        var total = 0;
        order.orderDetails.forEach(detail => {
            total+= (detail.price * detail.count);
            
        });
        return total+15;
    }
    return (
        <>
            <div className="myaccount-content">
                <h4 className="title">My Orders </h4>
                <div className="table_page table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Order Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {allOrders.map(order => (
                            <tr>
                                <td>{order.orderHeaderId}</td>
                                <td>{new Date(order.orderTime).toLocaleString('en-US')}</td>
                                <td>{calculateTotal(order)} TL</td>
                                <td>
                                <Link  type="button" to={`/order-details/${order.orderHeaderId}`} class="btn btn-outline-success">Details    
                                </Link></td>
                            </tr>

                        ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Order
