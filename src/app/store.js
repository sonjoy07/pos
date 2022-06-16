import { configureStore  } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import categorySlide from '../reducers/categoryReducer'

export const store = configureStore({
  reducer: {
    category: categorySlide,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})