import React from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import Layout from '../../components/MyAccountDashboard/Layout'
import Order from '../../components/MyAccountDashboard/Order'
import Footer from '../../components/Common/Footer'
const CustomerOrder = () => {
    return (
        <>
            <Header />
            <Banner title="Customer Panel" />
            <Order />
            <Footer />
        </>
    )
}

export default CustomerOrder;
