import { createSlice } from '@reduxjs/toolkit';

const baseUrlSlice = createSlice({
    name: 'baseUrl',
    initialState: 'https://technicians.onrender.com/',
    reducers: {
        setBaseUrl: (state, action) => {
            state = action.payload;
        },
    },
});

export const { setBaseUrl } = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
