import { createSlice } from '@reduxjs/toolkit'
import axios from '../components/Axios';

const initialState = {
    data: {},
}

const brandSlide = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload.data)
        },
        getData: (state, action) => {
            state.data = action.payload
        },
        updateData: (state, action) => {
            const index = state.data.findIndex(res => res._id === action.payload.data._id)
            const newArray = [...state.data];
            newArray[index] = action.payload.data
            return {
                ...state,
                data: newArray
            }

        },
        deleteData: (state, action) => {
            const filtered = state.data.filter(res => res._id !== action.payload.data._id)
            return {
                ...state,
                data: filtered
            }

        },

    },
})

export const getBrand = () => async (dispatch) => {
    try {
        const response = await axios.get(`/brand/index`);
        dispatch(getData(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const addBrand = (data) => async (dispatch) => {
    try {
        const response = await axios.post("/brand/save", data);
        dispatch(addData(response.data));
        return response
    } catch (err) {
        throw new Error(err);
    }
};
export const editBrand = (data) => async (dispatch) => {
    try {
        const response = await axios.put("/brand/update", data);
        dispatch(updateData(response.data));
        return response
    } catch (err) {
        throw new Error(err);
    }
};
export const deleteBran = (data) => async (dispatch) => {
    try {
        const response = await axios.delete("/brand/delete", {data:{id: data._id}});
        console.log(response);
        dispatch(deleteData(response.data));
        return response
    } catch (err) {
        throw new Error(err);
    }
};


// Action creators are generated for each case reducer function
export const { addData, getData, updateData, deleteData } = brandSlide.actions;
export const showBrand = (state) => state.brand.data;
export default brandSlide.reducer;
