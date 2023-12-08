import React,{ useEffect }  from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import OrderCompleted from '../../components/OrderCompleted'
import Footer from '../../components/Common/Footer'
import { useDispatch,useSelector } from 'react-redux'
import { getAllUserOrders } from '../../app/Actions/Index'
const OrderComplete = () => {
    let status = useSelector((state) => state.shoppingCard.lastOrderSuccess);
    let user = useSelector((state) => state.user.user);
    let dispatch = useDispatch();

    useEffect(() => {
        if(status){
            dispatch(getAllUserOrders(user));
            dispatch({ type: "shoppingCard/clearOrderFlag" });
        }
        
      },[status]);

    return (
        <>
            <Header />
            <Banner title="Your Order Has Been Received" />
            <OrderCompleted />
            <Footer />
        </>
    )
}

export default OrderComplete