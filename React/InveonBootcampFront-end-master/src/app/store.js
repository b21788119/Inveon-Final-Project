import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import ordersReducer from "./slices/order";
import shoppingcartReducer from "./slices/shoppingCard";
import chatReducer from "./slices/chat";

export const store = configureStore ( {
    reducer : {
        products : productsReducer,
        user : userReducer,
        shoppingCard:shoppingcartReducer,
        settings : settingsReducer,
        orders : ordersReducer,
        chat : chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for async actions
    })
})