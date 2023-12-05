import {React, useEffect } from "react";
import { Link } from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import userManager from '../../../userManager';
import { getAllFavorites,getUserBasket } from "../../../app/Actions/Index";

const TopHeader = () => {
    let dispatch = useDispatch();
    const history = useNavigate()

    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    const logout = () => {
        userManager.signoutRedirect({ 'id_token_hint': user.id_token });
        userManager.removeUser();
        dispatch({ type: "user/logout" })
        history("/");
    }

    const login = () => {
        userManager.signinRedirect({
            data: { path: "/" },
        });
    };

    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                                {
                                    !status ?
                                        <ul className="right_list_fix">
                                            <li>
                                                <Link onClick={() => login()}><i className="fa fa-user"></i>Login</Link>
                                            </li>
                                            <li>
                                                <Link to="/register"><i className="fa fa-lock"></i>Register</Link>
                                            </li>
                                        </ul>
                                        :
                                        <ul className="right_list_fix">
                                            <li><Link to="/order-tracking"><i className="fa fa-truck">
                                            </i> Track Your Order</Link></li>
                                            <li className="after_login"><img src={avater} alt="avater" />
                                                {user.name || 'İbrahim Gökyar'} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to="/my-account/customer-order">
                                                        <i className="fa fa-cubes"></i> My Orders</Link></li>
                                                    <li><Link onClick={() => { logout() }} >
                                                        <i className="fa fa-sign-out"></i> Logout</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopHeader