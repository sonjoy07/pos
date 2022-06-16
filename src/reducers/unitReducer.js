import { createSlice } from '@reduxjs/toolkit'
import axios from '../components/Axios';

const initialState = {
    data: {},
}

const unitSlide = createSlice({
    name: 'unit',
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

export const getUnit = () => async (dispatch) => {
    try {
        const response = await axios.get(`/unit/index`);
        dispatch(getData(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const addUnit = (data) => async (dispatch) => {
    try {
        const response = await axios.post("/unit/save", data);
        dispatch(addData(response.data));
        return response
    } catch (err) {
        throw new Error(err);
    }
};
export const editUnit = (data) => async (dispatch) => {
    try {
        const response = await axios.put("/unit/update", data);
        dispatch(updateData(response.data));
        return response
    } catch (err) {
        throw new Error(err);
    }
};
export const deleteCat = (data) => async (dispatch) => {
    console.log(data)
    try {
        const response = await axios.delete("/unit/delete", {data:{id: data._id}});
        console.log(response);
        dispatch(deleteData(response.data));
        return response
    } catch (err) {
        throw new Error(err);
    }
};


// Action creators are generated for each case reducer function
export const { addData, getData, updateData, deleteData } = unitSlide.actions;
export const showUnit = (state) => state.unit.data;
export default unitSlide.reducer;
