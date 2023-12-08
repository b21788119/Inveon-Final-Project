import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
    let allOrders = useSelector((state) => state.orders.allUserOrders);
    let reversedOrders = [...allOrders].reverse();
    const thStyle = {
        verticalAlign: 'middle',
      };
    const calculateTotal = (order)=>{
        var total = 0;
        order.orderDetails.forEach(detail => {
            total+= (detail.price * detail.count);
            
        });
        return total+15;
    }
    return (
        <>
        <div className="container mt-4"> 
            <div className="row justify-content-center"> 
                <div className="col-md-12">
                <div class="card">
            <div className="card-header" >
                My Orders
            </div>
            <div className="card-body">
            <table className="table">
                    <thead>
                        <tr>
                        <th style={thStyle} scope="col">Order ID</th>
                        <th style={thStyle} scope="col">Order Date</th>
                        <th style={thStyle} scope="col">Order Total</th>
                        <th style={thStyle} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {reversedOrders.map(order => (
                        <tr key={order.orderHeaderId}>
                            <td>{order.orderHeaderId}</td>
                                <td>{new Date(order.orderTime).toLocaleString('en-US')}</td>
                                <td>{calculateTotal(order)} TL</td>
                                <td>
                                <Link  type="button" to={`/order-details/${order.orderHeaderId}`} className="btn btn-outline-success">Details    
                                </Link></td>
                        </tr>
                        ))}
                    
                    </tbody>
        </table>   
            </div>
            </div>

                </div>

            </div>
        </div>


        
        </>
    )
}

export default Order
