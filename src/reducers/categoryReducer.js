import { createSlice } from '@reduxjs/toolkit'
import axios from '../components/Axios';

const initialState = {
    data: {},
}

const categorySlide = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload.data)
        },
        getData: (state, action) => {
            state.data = action.payload
        }
    },
})

export const getCategory = (data) => async (dispatch) => {
    try {
        const response = await axios.get(`/category/index`);
        dispatch(getData(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const addCategory = (data) => async (dispatch) => {
    try {
        const response = await axios.post("/category/save", data);
        dispatch(addData(response.data));
    } catch (err) {
        throw new Error(err);
    }
};


// Action creators are generated for each case reducer function
export const { addData, getData } = categorySlide.actions;
export  const showCategory = (state) => state.category.data;
export default categorySlide.reducer;
