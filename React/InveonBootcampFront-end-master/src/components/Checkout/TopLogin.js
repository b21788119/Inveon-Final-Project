import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { getUserBasket,getAllFavorites } from '../../app/Actions/Index';

const TopLogin = () => {
    let dispatch = useDispatch();

    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    // Login
    const login = () => {
        if(status){
            Swal.fire({
                icon: 'question',
                title: ''+user.name,
                html:'Zaten giriş yaptınız... <br />'
            })
        }else{
            dispatch({ type: "user/login" })
            let name = user.name || 'Customer'
            console.log(typeof(user.name));
            Swal.fire({
                icon: 'success',
                title: 'Giriş başarılı',
                text: 'Hoşgeldin '+ name
            })
        }

    }
    return (
        <>
           
        </>
    )
}

export default TopLogin