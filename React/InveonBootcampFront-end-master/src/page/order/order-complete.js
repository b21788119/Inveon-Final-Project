import React,{ useEffect }  from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import OrderCompleted from '../../components/OrderCompleted'
import Footer from '../../components/Common/Footer'
import { useDispatch,useSelector } from 'react-redux'
const OrderComplete = () => {
    let status = useSelector((state) => state.shoppingCard.lastOrderSuccess);
    let dispatch = useDispatch();

    useEffect(() => {
        if(status){
            dispatch({ type: "cart/clearOrderFlag" });
        }
        
      },[status]);

    return (
        <>
            <Header />
            <Banner title="Siparişiniz Alındı" />
            <OrderCompleted />
            <Footer />
        </>
    )
}

export default OrderComplete