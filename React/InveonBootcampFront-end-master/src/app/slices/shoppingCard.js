import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { getProductByID, getUserBasket, addToMyBasket,removeFromBasket, checkout } from "../Actions/Index"
import { enableMapSet } from 'immer';

// Enable the MapSet plugin
enableMapSet();

const detailsMapping = new Map();



const shoppingcartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
        detailsMap : detailsMapping,
        totalCount : 0,
        totalPrice:0,
        lastOrderSuccess:false,
        //single: ProductData[0],  // her bir ürün temsil eder
    },
    reducers: {
        AddToCart: (state, action) => {
            
        },

        updateCart: (state, action) => {
            
        },

        removeCart: (state, action) => {
           
        },

        clearOrderFlag:(state) => {
            state.lastOrderSuccess = false;
        },
        
        clearCart: (state) => {
            state.carts = []
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
                //console.log("*NULL STATE GET MY BASKET*");
            })
            .addCase(getUserBasket.fulfilled, (state, action) => {
                if(action.payload != false){
                    state.loading = false;
                    var counter = 0;
                    try{
                        const details = action.payload.cartDetails;
                        const temporaryMap = new Map();
                        details.forEach(element => {
                        temporaryMap.set(element.productId,element)
                        counter += element.count;
                        //state.totalPrice+= element.product.price * element.count;
                    });
                    state.detailsMap = temporaryMap;
                    state.totalCount = counter;
    
                    }catch(error){
                        console.log(error);
                    }

                }
               
            })
            .addCase(getUserBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                //console.log("*", state.error);
            })
            .addCase(addToMyBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("*NULL STATE GET MY BASKET*");
            })
            .addCase(addToMyBasket.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.detailsMap.set(action.payload.cartDetails[0].productId,action.payload.cartDetails[0]);
                state.totalCount += action.payload.totalIncrement;
                //state.totalPrice += action.payload.cartDetails[0].product.price * action.payload.totalIncrement;
                
            })
            .addCase(addToMyBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("*", state.error);
            })
            .addCase(removeFromBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("*NULL STATE GET MY BASKET*");
            })
            .addCase(removeFromBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.totalCount-= state.detailsMap.get(action.payload.productId).count;
                //state.totalPrice -= state.detailsMap.get(action.payload.productId).product.price * state.detailsMap.get(action.payload.productId).count;
                state.detailsMap.delete(action.payload.productId);
                
            })
            .addCase(removeFromBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(checkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.loading = false;
                state.lastOrderSuccess = true;
                state.detailsMap.clear();
                
            })
            .addCase(checkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

const shoppingcartReducer = shoppingcartSlice.reducer
export default shoppingcartReducer

