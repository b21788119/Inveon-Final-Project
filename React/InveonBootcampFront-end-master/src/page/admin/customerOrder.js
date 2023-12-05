import React from 'react';
import Header from "../../components/Common/Header";
import Footer from '../../components/Common/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const CustomerOrderDetails = () => {
    const params = useParams();
    const id = params.id;
    let user = useSelector((state) => state.user.user)
    let allOrders = useSelector((state) => state.orders.allOrders);
    let allUserOrders = useSelector((state) => state.orders.allUserOrders);


    let allProducts = useSelector((state) => state.products.products);

    const getProductImage = (productId) => {
        const product = allProducts.filter(product => product.productId == productId)[0];

        return product.imageUrl;
    }


    if (user.role === "Admin") {
        let order = allOrders.filter(order => order.orderHeaderId == id)[0];
        return (<>
            <Header />
            <div className="card">
                <div className="card-header">
                    <h2><span  className="badge bg-light">Order Details</span></h2>
                </div>
                <div className="card-body">
                    {order.orderDetails.map(detail => (

                        <div className="card mb-3" >
                            <div className="row g-0" style={{ maxWidth: '50%' }}>
                                <div className="col-md-4">
                                    <img src={getProductImage(detail.productId)} className="img-fluid rounded-start" ></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="container">
                                            <h3><span style={{ color: 'black' }} className="badge bg-light">{detail.productName}</span></h3>
                                            <div className="row justify-content-between">
                                                <div className="col-4">
                                                    <h3><span style={{ color: 'black' }} className="badge bg-light">Unit Price</span></h3>
                                                </div>
                                                <div className="col-4">
                                                    <h3><span style={{ color: 'black' }} className="badge bg-light">{detail.price} TL</span></h3>
                                                </div>
                                            </div>
                                            <div className="row justify-content-between">
                                                <div className="col-4">
                                                    <h3><span style={{ color: 'black' }} className="badge bg-light">Total Count</span></h3>
                                                </div>
                                                <div className="col-4">
                                                    <h3><span style={{ color: 'black' }} className="badge bg-light">{detail.count}</span></h3>
                                                </div>
                                            </div>
                                            <div className="row justify-content-between">
                                                <div className="col-4">
                                                    <h3><span style={{ color: 'black' }} className="badge bg-light">Item Total</span></h3>
                                                </div>
                                                <div className="col-4">
                                                    <h3><span style={{ color: 'black' }} className="badge bg-light">{detail.count * detail.price} TL</span></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div class="card-header">
                    <div class="row justify-content-between">
                        <div class="col-4">
                            <h2><span style={{ color: 'black' }} class="badge bg-light">+15 TL Shipping Fee </span></h2>
                        </div>
                        <div class="col-4">
                            <div class="row justify-content-between">
                                <div class="col-4">
                                    <h2><span style={{ color: 'black' }} class="badge bg-light">Order Total : </span></h2>
                                </div>
                                <div class="col-4">
                                    <h2><span style={{ color: 'black' }} class="badge bg-light">{order.orderTotal} TL</span></h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </>)


    }

    else {
        let order = allUserOrders.filter(order => order.orderHeaderId == id)[0];
        return (<>
            <Header />
            <div class="card">
                <div class="card-header">
                    <h2><span style={{ color: 'black' }} class="badge bg-light">Order Details</span></h2>
                </div>
                <div class="card-body">
                    {order.orderDetails.map(detail => (

                        <div class="card mb-3" >
                            <div class="row g-0" style={{ maxWidth: '50%' }}>
                                <div class="col-md-4">
                                    <img src={getProductImage(detail.productId)} class="img-fluid rounded-start" ></img>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <div class="container">
                                            <h3><span style={{ color: 'black' }} class="badge bg-light">{detail.productName}</span></h3>
                                            <div class="row justify-content-between">
                                                <div class="col-4">
                                                    <h3><span style={{ color: 'black' }} class="badge bg-light">Unit Price</span></h3>
                                                </div>
                                                <div class="col-4">
                                                    <h3><span style={{ color: 'black' }} class="badge bg-light">{detail.price} TL</span></h3>
                                                </div>
                                            </div>
                                            <div class="row justify-content-between">
                                                <div class="col-4">
                                                    <h3><span style={{ color: 'black' }} class="badge bg-light">Total Count</span></h3>
                                                </div>
                                                <div class="col-4">
                                                    <h3><span style={{ color: 'black' }} class="badge bg-light">{detail.count}</span></h3>
                                                </div>
                                            </div>
                                            <div class="row justify-content-between">
                                                <div class="col-4">
                                                    <h3><span style={{ color: 'black' }} class="badge bg-light">Item Total</span></h3>
                                                </div>
                                                <div class="col-4">
                                                    <h3><span style={{ color: 'black' }} class="badge bg-light">{detail.count * detail.price} TL</span></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div class="card-header">
                    <div class="row justify-content-between">
                        <div class="col-4">
                            <h2><span style={{ color: 'black' }} class="badge bg-light">+15 TL Shipping Fee </span></h2>
                        </div>
                        <div class="col-4">
                            <div class="row justify-content-between">
                                <div class="col-4">
                                    <h2><span style={{ color: 'black' }} class="badge bg-light">Order Total : </span></h2>
                                </div>
                                <div class="col-4">
                                    <h2><span style={{ color: 'black' }} class="badge bg-light">{order.orderTotal} TL</span></h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </>)



    }



}
export default CustomerOrderDetails;