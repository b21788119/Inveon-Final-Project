import Header from "../../components/Common/Header"
import Footer from "../../components/Common/Footer"
import { Link } from 'react-router-dom'
import React,{useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../app/Actions/Index";

const AdminPanel = () => {
    let dispatch = useDispatch();
    let adminUser = useSelector((state) => state.user.user);
    let allOrders = useSelector((state) => state.orders.allOrders);
    let reversedOrders = [...allOrders].reverse();
    let allProducts = useSelector((state) => state.products.products);
    const [tabControl,setTab] = useState("true");

    const thStyle = {
        verticalAlign: 'middle',
      };

    const handleOrderTabClick = () =>{
        if(tabControl === "false"){

            setTab("true");
        }
    }
    const handleProductTabClick = () =>{
        if(tabControl === "true"){
            setTab("false");
        }
    }

    const calculateTotal = (order)=>{
        var total = 0;
        order.orderDetails.forEach(detail => {
            total+= (detail.price * detail.count);
            
        });
        return total+15;
    }

    useEffect(() => {
        if(tabControl === "true"){
            dispatch(getAllOrders({adminUser:adminUser}));
        }
      }, [tabControl]);

    const generateRandomCategory = ()=>{
        return (Math.random(0,1000000) % 3) == 0 ? "Men's Fashion" : "Woman's Fashion";
    }


    const getPanel = ()=>{
        return tabControl === "true" ? (<>
            <table class="table">
                    {}
                    <thead>
                        <tr>
                        <th style={thStyle} scope="col">Order ID</th>
                        <th style={thStyle} scope="col">Customer Name</th>
                        <th style={thStyle} scope="col">Customer Surname</th>
                        <th style={thStyle} scope="col">Customer Email</th>
                        <th style={thStyle} scope="col">Order Total</th>
                        <th style={thStyle} scope="col">Discount Total</th>
                        <th style={thStyle} scope="col">Total Items</th>
                        <th style={thStyle} scope="col">Order Time</th>
                        <th style={thStyle} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {reversedOrders.map(order => (
                        <tr key={order.orderHeaderId}>
                            <th scope="row">{order.orderHeaderId}</th>
                            <td>{order.firstName}</td>
                            <td>{order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{calculateTotal(order)} TL</td>
                            <td>{calculateTotal(order)} TL</td>
                            <td>{order.cartTotalItems}</td>
                            <td>{new Date(order.orderTime).toLocaleString('en-US')}</td>
                            <td>
                            <Link  type="button" to={`/order-details/${order.orderHeaderId}`} class="btn btn-outline-success">Details    
                            </Link></td>
                        </tr>
                        ))}
                    
                    </tbody>
                </table>
        
        
        </>) : (<>
            <table class="table">
                    {}
                    <thead>
                        <tr>
                        <th style={thStyle} scope="col">Product ID</th>
                        <th style={thStyle} scope="col">Product Name</th>
                        <th style={thStyle} scope="col">Description</th>
                        <th style={thStyle} scope="col">Category</th>
                        <th style={thStyle} scope="col">Sub Category</th>
                        <th style={thStyle} scope="col">Price</th>
                        <th style={thStyle} scope="col">Image Path</th>
                        <th style={thStyle} scope="col"></th>
                        <th style={thStyle} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {allProducts.map(product => (
                        <tr key={product.productId}>
                            <th scope="row">{product.productId}</th>
                            <td>{product.name.length >= 20 ? product.name.substr(0,20)+"..." : product.name}</td>
                            <td>{product.description.length >= 20 ? product.description.substr(0,20)+"..." : product.description}</td>
                            <td>Men's Fashion</td>
                            <td>{product.categoryName} TL</td>
                            <td>{product.price} TL</td>
                            <td>{product.imageUrl.substr(0,20)}...</td>
                            <td><button type="button" class="btn btn-outline-success">Details</button></td>
                            <td><button type="button" class="btn btn-outline-danger">Delete</button></td>
                        </tr>
                        ))}
                    
                    </tbody>
                </table>
        
        
        
        </>)



    }


    return (
        <>
            <Header />
            
            <div className="card text-center">
                <div className="card-header" style={{backgroundColor:"White"}}>
                    <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                    <Link className= {`nav-link ${tabControl==="true" ? "active" : ""}`} onClick={()=>handleOrderTabClick()} aria-current={tabControl}>
                        Orders
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${tabControl==="false" ? "active" : ""}`} onClick={()=>handleProductTabClick()} aria-current={tabControl === "true" ? "false" : "true"} >
                        Products
                    </Link>
                    </li>
                    </ul>
                </div>
                <div className="card-body">
                 {getPanel()}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AdminPanel