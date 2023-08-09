import { createSlice } from '@reduxjs/toolkit';

const baseUrlSlice = createSlice({
    name: 'baseUrl',
    initialState: 'https://adminzaindev.zaindev.com.sa/',
    reducers: {
        setBaseUrl: (state, action) => {
            state = action.payload;
        },
    },
});

export const { setBaseUrl } = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
