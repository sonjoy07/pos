import { configureStore  } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import categorySlide from '../reducers/categoryReducer'
import unitSlide from '../reducers/unitReducer'
import productSlide from '../reducers/productReducer'
import brandSlide from '../reducers/brandReducer'

export const store = configureStore({
  reducer: {
    category: categorySlide,
    unit: unitSlide,
    brand: brandSlide,
    product: productSlide,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})