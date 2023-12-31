import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders,getAllUserOrders } from "../Actions/Index"

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        userOrders: [],
        allOrders:[],
        allUserOrders:[],
        lock:false,
        
    },
    reducers: {
        AddNewOrder: (state, action) => {
            state.allUserOrders.push(action.payload.order);
        },
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.allOrders = action.payload.result;
                state.lock = true;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAllUserOrders.pending, (state) => {
                state.loading = true;
                console.log("here");
            })
            .addCase(getAllUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.allUserOrders = action.payload.result;
                state.lock = true;
            })
            .addCase(getAllUserOrders.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error.message);
            });
    },
})

const ordersReducer = ordersSlice.reducer
export default ordersReducer