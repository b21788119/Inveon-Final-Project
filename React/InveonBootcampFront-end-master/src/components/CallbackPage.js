import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import userManager from '../userManager';
import { getAllFavorites,getUserBasket} from '../app/Actions/Index';

const CallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successCallback = (user) => {
    const userProfile = {
      name: user.profile.name,
      role: user.profile.role,
      email: user.profile.preferred_username,
      id_token: user.id_token,
      access_token: user.access_token,
      user_id: user.profile.sub
    }
    dispatch({ type: "user/login", payload: { user: userProfile, status: true } });
    if(user.profile.role === "Admin"){
      navigate("/AdminPanel");
    }
    else{
      navigate("/");
    }

  };

  const errorCallback = (error) => {
    console.log("Error in callback page: ", error);
    navigate('/');
  };

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(user => successCallback(user))
      .catch(error => errorCallback(error));
  });

  return <div>Loading...</div>;
};

export default connect()(CallbackPage);