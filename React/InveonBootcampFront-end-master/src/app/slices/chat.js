import { createSlice } from "@reduxjs/toolkit";
import { handleConnectionEstablisment, handleReceivedMessage } from "../Actions/Index";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages:[],
        connection : null,
        lock:false,
    },
    reducers: {
    },extraReducers: (builder) => {
        builder
            .addCase(handleReceivedMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleReceivedMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload.message)
                state.lock = true;
            })
            .addCase(handleReceivedMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(handleConnectionEstablisment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleConnectionEstablisment.fulfilled, (state, action) => {
                state.loading = false;

                if(state.connection === null){
                    state.connection = action.payload.connection;
                    state.lock = true;
                }
            })
            .addCase(handleConnectionEstablisment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

const chatReducer = chatSlice.reducer
export default chatReducer