import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { getAllProducts, getProductByID, getProductsByCategory, removeFromFavoriteList, addNewFavorite,getAllFavorites } from "../Actions/Index"


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: ProductData,
        carts: [],
        favorites: [],
        favoriteProducts:[],
        single: ProductData[0],  
    },
    reducers: {
        AddToCart: (state, action) => {
            
        },

        getProductById: (state, action) => {
           
        },

        updateCart: (state, action) => {
            
        },

        removeCart: (state, action) => {
           
        },


        clearCart: (state) => {
            state.carts = []
        },

        addToFavorites: (state, action) => {
            
        },
        
        removeToFav: (state, action) => {
            
        },

        clearFav: (state) => {
            state.favorites = [] 
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.result;

            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(getAllFavorites.pending, (state) => {
                state.loading = true;

            })
            .addCase(getAllFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            })
            .addCase(getAllFavorites.fulfilled, (state, action) => {
                state.loading = false;
                const allFavorites = action.payload.result;
                const temporary = [];
                allFavorites.forEach(element => {
                    temporary.push(element.productId);
                });
                state.favoriteProducts = allFavorites;
                state.favorites = temporary;
                
            })
            .addCase(addNewFavorite.pending, (state) => {
                state.loading = true;

            })
            .addCase(addNewFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            })
            .addCase(addNewFavorite.fulfilled, (state, action) => {
                const payload = action.payload;
                payload.productDto = state.products.filter(item => item.productId === action.payload.productId)[0];
                state.loading = false;
                state.favorites.push(action.payload.productId);
                state.favoriteProducts.push(payload);
            })
            .addCase(removeFromFavoriteList.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromFavoriteList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeFromFavoriteList.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.favorites = state.favorites .filter(item => item !== action.payload.deletedID);
                state.favoriteProducts = state.favoriteProducts .filter(item => item.productId !== action.payload.deletedID);
            });
            
    },
})

const productsReducer = productsSlice.reducer
export default productsReducer

