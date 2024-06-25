import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: 0,
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.cartItems += 1
    },
    decrement: (state) => {
      state.cartItems -= 1
    },
    incrementByAmount: (state, action) => {
      // console.log(action.payload.count)
      state.cartItems += action.payload.count
    },
    reset: (state) => {
      state.cartItems = initialState.cartItems
      // console.log('ho')
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } = cartReducer.actions

export default cartReducer.reducer