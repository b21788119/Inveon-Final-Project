import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  const response = await axios.get('https://localhost:5050/api/products')
    .catch(error => {
      console.error("API Error:", error);
      throw error; // Throw the error again to trigger the rejection of the promise
    });
  return response.data;
});

// Action to get products by category
export const getProductsByCategory = createAsyncThunk('products/getProductsByCategory', async (categoryName) => {
  //console.log("Inside get products by category: ", categoryName);
  try {
    const response = await axios.get(`https://localhost:5050/api/products/byCategory/${categoryName}`);
    //console.log("API Response:", response.data);
    return  { categoryName, "_products": response.data };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});

export const getProductByID = createAsyncThunk('products/getProductByID', async (productId) => {
  //console.log("Inside get products by id: ", productId);
  try {
    const response = await axios.get(`https://localhost:5050/api/products/${productId}`);
    //console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});

export const getAllFavorites = createAsyncThunk('products/getAllFavorites', async (user) => {
  const headers = {
    'Authorization': `Bearer ${user.access_token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
    'Access-Control-Max-Age': '1800',
  };
  const response = await axios.get(`https://localhost:5050/api/favorites/${user.user_id}`,{ headers })
    .catch(error => {
      console.error("API Error:", error);
      throw error; // Throw the error again to trigger the rejection of the promise
    });
  
  console.log(response.data);
  return response.data;
});




export const addNewFavorite = createAsyncThunk('products/addNewFavorite', async ({user, productId, _action}) => {
  console.log(productId);
  try {
    let response;
    const headers = {
      'Authorization': `Bearer ${user.access_token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
      'Access-Control-Max-Age': '1800',
    };

    if (_action === 'add') {
      response = await axios.post(
        `https://localhost:5050/api/favorites`,
        //favoriteitemdto
        { "UserId": user.user_id, "ProductId": productId },
        { headers }
      );
    } else if (_action === 'remove') {
      response = await axios.delete(`https://localhost:5050/api/favorites`, {
        //favoriteitemdto
        data: { "UserId": user.user_id, "ProductId": productId },
        headers,
      });
    } else {
      throw new Error("Invalid action specified. Use 'add' or 'remove'.");
    }

    const responseData = response.data;

    if (responseData && responseData.isSuccess) {
      return responseData.result;
    } else {
      throw new Error(responseData.displayMessage || 'API Error');
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});



export const removeFromFavoriteList = createAsyncThunk('products/removeFromFavoriteList', async ({user, productId, _action}) => {
  try {
    let response;
    const headers = {
      'Authorization': `Bearer ${user.access_token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
      'Access-Control-Max-Age': '1800',
    };
     if (_action === 'remove') {
      response = await axios.delete(`https://localhost:5050/api/favorites`, {
        //favoriteitemdto
        data: { "UserId": user.user_id, "ProductId": productId },
        headers,
      });
    } else {
      throw new Error("Invalid action specified. Use 'add' or 'remove'.");
    }

    const responseData = response.data;

    if (responseData && responseData.isSuccess) {
      responseData.deletedID = productId;
      return responseData;
    } else {
      throw new Error(responseData.displayMessage || 'API Error');
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});



export const getUserBasket = createAsyncThunk('cart/getUserBasket', async (user) => {
  try {
    const headers = {
      'Authorization': `Bearer ${user.access_token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
      'Access-Control-Max-Age': '1800',
    };
    console.log(user.user_id);
    const response = await axios.get(`https://localhost:5050/api/cart/${user.user_id}`, { headers });

    const responseData = response.data;
    console.log("Inside getMyBasket the result is: ", responseData.result);

    if (responseData.isSuccess && responseData.result != true) {
      return responseData.result;
    } 
    else{
      return false;
    }
  } catch (error) {
    // Handle the case where an error occurred
    console.error('API Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong. Please try again.',
    });
    
  }
}
);


export const addToMyBasket = createAsyncThunk('cart/addToMyBasket', async ({ user, product, count }) => {

  let cartHeader = {
    CartHeaderId: 0,
    UserId: user.user_id,
    CouponCode: null
  };
  let cartDetails = [
    {
      CartDetailsId: 0,
      CartHeader: null,
      CartHeaderId: 0,
      Product: product,
      ProductId: product.productId,
      Count: count
    }
  ];
  let cartDto = {
    CartHeader: cartHeader,
    CartDetails: cartDetails
  };
  const headers = {
    'Authorization': `Bearer ${user.access_token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
    'Access-Control-Max-Age': '1800',
  };
  try {
    const response = await axios.post(
      `https://localhost:5050/api/cart`,
      cartDto,
      { headers }
    );

    const responseData = response.data;

    if (responseData.isSuccess) {
      // Handle the case where the request is successful
      Swal.fire({
        icon: 'success',
        title: 'Added to Basket',
        text: 'The item has been added to your basket.',
      });
      const result = responseData.result;
      result.totalIncrement = count;
      return result;
    } else {
      // Handle the case where the request is not successful
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add the item to your basket. Please try again.',
      });
    
    }
  } catch (error) {
    // Handle the case where an error occurred
    console.error('API Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong. Please try again.',
    });
    
  }
}
);


export const removeFromBasket = createAsyncThunk('cart/removeFromBasket', async ({ user, cartDetailsId,productId }) => {

  const headers = {
    'Authorization': `Bearer ${user.access_token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
    'Access-Control-Max-Age': '1800',
    'Content-Type': 'application/json'
  };  
  try {
    let cartId = cartDetailsId;
    console.log("here");
    console.log(cartId);
      const response = await axios.delete(
        `https://localhost:5050/api/cart/RemoveCart/${cartId}`
      );

      const responseData = response.data;
    
      if (responseData.isSuccess) {
        // Handle the case where the request is successful
        Swal.fire({
          icon: 'success',
          title: 'Removed from Basket',
          text: 'The item has been removed from your basket.',
        });
        const result = responseData.result;
        return result ? {productId:productId} : {};
      } else {
        // Handle the case where the request is not successful
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove the item from your basket. Please try again.',
        });
        
      }
    } catch (error) {
      // Handle the case where an error occurred
      console.error('API Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
      
    }
  }
);


export const checkout = createAsyncThunk('cart/checkout', async ({ user,cartHeaderId,form}) => {
  let checkoutHeaderDto = {
    CartHeaderId : cartHeaderId,
    UserId: user.user_id,
    CouponCode: "",
    OrderTotal: form.OrderTotal,
    DiscountTotal: form.DiscountTotal,
    FirstName: form.FirstName,
    LastName: form.LastName,
    PickupDateTime: new Date(),
    Phone: form.Phone,
    Email: form.Email,
    CardNumber: "5528790000000008",
    CVV: "123",
    ExpiryMonth: "12",
    ExpiryYear: "2030",
    CartTotalItems: 0,
    CartDetails: null
  }
  
  const headers = {
    'Authorization': `Bearer ${user.access_token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Max-Age': '1800'
  };

  try {
    const response = await axios.post(
      'https://localhost:5050/api/cartc',
      checkoutHeaderDto,
      { headers }
    );

    const responseData = response.data;
    console.log(response.data);
    
    //console.log("RESPONSE: ", responseData);

    if (responseData.isSuccess) {
      return responseData.result;
    } else {
      throw new Error('Something went wrong. Please try again.');
      //return { isSuccess: false, error: 'Failed to complete the order. Please try again.' };
    }
  } catch (error) {
    throw new Error('Something went wrong. Please try again.');
    //return { isSuccess: false, error: 'Failed to complete the order. Please try again.' };
  }
    
  
}
);

export const getAllOrders = createAsyncThunk('orders/getAllOrders', async ({adminUser}) => {
  const headers = {
    'Authorization': `Bearer ${adminUser.access_token}`,
  };
  const response = await axios.get(`https://localhost:5050/api/orders/all`,{headers}).catch(error => {
      console.error("API Error:", error);
      throw error; // Throw the error again to trigger the rejection of the promise
    });
  
  
  console.log(response.data);
  return response.data;
});

export const getAllUserOrders = createAsyncThunk('orders/getAllUserOrders', async (user) => {
  const headers = {
    'Authorization': `Bearer ${user.access_token}`
  };
  const response = await axios.get(`https://localhost:5050/api/orders/${user.user_id}`,{headers}).catch(error => {
      console.error("API Error:", error);
      throw error; // Throw the error again to trigger the rejection of the promise
    });
  
  console.log("hello");
  console.log(response.data);
  return response.data;
});


export const handleReceivedMessage = createAsyncThunk(
  'chat/handleReceivedMessage',
  async (message) => {
    return {message:message};
  }
);

export const handleConnectionEstablisment = createAsyncThunk(
  'chat/handleConnectionEstablisment',async (connection) => {
    return {connection:connection};
  }



)
