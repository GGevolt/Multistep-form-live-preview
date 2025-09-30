import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: "",
    phoneNumber: "",
    birth: null,
    email: "",
    isCompleted: false
};


const step1Slice = createSlice({
    name: "step1",
    initialState,
    reducers: {
        updateStep1(state, { payload }) {
            state.name = payload.name;
            state.phoneNumber = payload.phoneNumber;
            state.birth = payload.birth;
            state.email = payload.email;
            state.isCompleted = payload.isCompleted;
        },
        resetStep1(state) {
            state.name = "";
            state.phoneNumber = "";
            state.birth = null;
            state.email = "";
            state.isCompleted = false
        }
    }
})


export const { updateStep1, resetStep1 } = step1Slice.actions;
export default step1Slice.reducer;