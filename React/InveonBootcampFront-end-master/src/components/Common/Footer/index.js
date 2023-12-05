import React, { useEffect } from 'react'
import mylogo from  "../../../assets/img/logo.png"
import payment from '../../../assets/img/common/payment.png'
import { Link } from 'react-router-dom'
import Cookie from '../Cookie'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";

const FooterData = [
    {
        title: "Info",
        links: [
            { linkTitle: "Home Page", link: "/" },
            { linkTitle: "About Us", link: "/about" },
            { linkTitle: "Order Tracking", link: "/order-tracking" }
        ]
    }
]

const Footer = () => {
    let dispatch = useDispatch();

    let promoCenter = useSelector((state) => state.settings.promoCenter);
    let promoStatus = useSelector((state) => state.settings.promoStatus);
    let stopPromo = useSelector((state) => state.settings.stopPromo);
    let cookie = useSelector((state) => state.settings.cookie);
    let stopCookie = useSelector((state) => state.settings.stopCookie);

    useEffect(() => {
        if (promoStatus) {
            return
        } else {
            dispatch({ type: "settings/promoStatus" })
            setTimeout(function () {
                dispatch({ type: "settings/promoCenter" })
            }, 2000)
        }

        if (stopCookie) {
            return
        } else {
            setTimeout(function () {
                dispatch({ type: "settings/cookie" })
            }, 6000)
        }
    }, [dispatch, promoStatus, stopCookie]);


    const startPromoModal = () => {
        if (stopPromo) {
            dispatch({ type: "settings/promoCenter" })
            return;
        } else {
            dispatch({ type: "settings/promoCenter" })
            setTimeout(function () {
                dispatch({ type: "settings/promoCenter" })
            }, 700000)
        }

    }

    const stopPromoModal = () => {
        dispatch({ type: "settings/stopPromo" })
    }

    const cancelCookie = () => {
        dispatch({ type: "settings/cookie" })
    }

    const acceptCookie = () => {
        // Write your function there
        dispatch({ type: "settings/cookie" })
    }

    return (
        <>
            <footer id="footer_one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="footer_left_side">
                                <Link to="/" ><img  style={{ width: "150px", height: "70px"}}  src={mylogo} alt="my basket"/></Link>
                                <p>
                                    <strong>
                                        GLOFF </strong> is the world's most useful and easy to use fashion network.
                                        Become a part of a network of networks.
                                </p>
                                <div className="footer_left_side_icon">
                                    <ul>
                                        <li>
                                            <a href="#!"><i className="fa-brands fa-facebook-f"></i></a>
                                        </li>
                                        <li>
                                            <a href="#!"><i className="fa-brands fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="#!"><i className="fa-brands fa-linkedin"></i></a>
                                        </li>
                                        <li>
                                            <a href="#!"><i className="fa-brands fa-instagram"></i></a>
                                        </li>
                                        <li>
                                            <a href="#!"><i className="fa-brands fa-google"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                            {FooterData.slice(0, 1).map((data, index) => (
                                <div className="footer_one_widget" key={index}>
                                    <h3>{data.title}</h3>
                                    <ul>
                                        {data.links.map((link, index) => (
                                            <li key={index}><Link to={link.link}>{link.linkTitle}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                            {FooterData.slice(1, 2).map((data, index) => (
                                <div className="footer_one_widget" key={index}>
                                    <h3>{data.title}</h3>
                                    <ul>
                                        {data.links.map((link, index) => (
                                            <li key={index}><Link to={link.link}>{link.linkTitle}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
                <div className="go-top active" onClick={() => { window.scrollTo(0, 0) }}>
                    <i className="fa fa-chevron-up"></i>
                    <i className="fa fa-arrow-up"></i>
                </div>
            </footer>

            <section id="copyright_one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="copyright_left">
                                <h6>© CopyRight 2023 <span>GLOFF Official</span></h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="copyright_right">
                                <img src={payment} alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                cookie ? <Cookie accept={acceptCookie} cancel={cancelCookie} /> : null
            }

        </>
    )
}

export default Footer