import { createSlice } from '@reduxjs/toolkit'
import axios from '../components/Axios';

const initialState = {
    data: [],
}

export const categoryReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload);
        },
        getData: (state, action) => {
            state.data = [action.payload];
        }
    },
})
export const getCategory = (data) => async (dispatch) => {
    try {
        const response = await axios.get(`/category/index`);
        console.log('response',response)
        dispatch(getData(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const addCategory = (data) => async (dispatch) => {
    try {
        // console.log(data);
        const response = await axios.post("/category/save", data);
        // console.log(response);
        dispatch(addData(response.data));
    } catch (err) {
        throw new Error(err);
    }
};


// Action creators are generated for each case reducer function
export const { addData, getData } = categoryReducer.actions;
export const showCategory = (state) => state.category.data;
export default categoryReducer.reducer;
