import { applyMiddleware} from 'redux';
import { configureStore,getDefaultMiddleware  } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import categoryReducer from '../reducers/categoryReducer'

export const store = configureStore({
  reducer: {
    category: categoryReducer,

  },
  middleware: [applyMiddleware(thunk), getDefaultMiddleware()]
})