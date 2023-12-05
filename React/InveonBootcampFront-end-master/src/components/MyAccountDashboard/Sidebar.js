import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

const Sidebar = () => {
    const location = useLocation()
    let dispatch = useDispatch();
    const history = useNavigate()
    let status = useSelector((state) => state.user.status);
    const logout = () => {
        Swal.fire({
            icon: 'success',
            title: 'Çıkış Başarılı',
            text: 'Teşekürrler'
        })
        dispatch({ type: "user/logout" })
        history("/login");
    }
    return (
        <>
            
        </>
    )
}

export default Sidebar
