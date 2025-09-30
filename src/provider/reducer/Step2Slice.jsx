import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    country: '',
    traverlers: 1,
    activities: [],
    intensity: '',
    note: '',
    isCompleted: false,
};


const step2Slice = createSlice({
    name: "step2",
    initialState,
    reducers: {
        updateStep2(state, { payload }) {
            state.country = payload.country;
            state.traverlers = payload.traverlers;
            state.activities = payload.activities;
            state.intensity = payload.intensity;
            state.note = payload.note;
            state.isCompleted = payload.isCompleted;
        },
        resetStep2(state) {
            state.country = '';
            state.traverlers = 0;
            state.activities = [];
            state.intensity = '';
            state.note = '';
            state.isCompleted = false;
        }
    }
})


export const { updateStep2, resetStep2 } = step2Slice.actions;
export default step2Slice.reducer;