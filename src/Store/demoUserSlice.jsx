import { createSlice } from '@reduxjs/toolkit';

const demoUserSlice = createSlice({
    name: 'demoUser',
    initialState: '',
    reducers: {
            setDemoUserMode: (state, action) => {
                return action.payload;
            },
    },
});

export const { setDemoUserMode } = demoUserSlice.actions;
export default demoUserSlice.reducer;