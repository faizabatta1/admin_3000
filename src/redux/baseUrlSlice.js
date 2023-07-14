import { createSlice } from '@reduxjs/toolkit';

const baseUrlSlice = createSlice({
    name: 'baseUrl',
    initialState: 'http://localhost:3000/',
    reducers: {
        setBaseUrl: (state, action) => {
            state = action.payload;
        },
    },
});

export const { setBaseUrl } = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
