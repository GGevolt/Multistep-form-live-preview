import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    budget: 200,
    wifi: false,
    accommodation: '',
    transport: [],
    isCompleted: false,
};


const step3Slice = createSlice({
    name: "step3",
    initialState,
    reducers: {
        updateStep3(state, { payload }) {
            state.budget = payload.budget;
            state.wifi = payload.wifi;
            state.accommodation = payload.accommodation;
            state.transport = payload.transport;
            state.isCompleted = payload.isCompleted;
        },
        resetStep3(state) {
            state.budget = 200;
            state.wifi = false;
            state.accommodation = '';
            state.transport = [];
            state.isCompleted = false;
        }
    }
})


export const { updateStep3, resetStep3 } = step3Slice.actions;
export default step3Slice.reducer;