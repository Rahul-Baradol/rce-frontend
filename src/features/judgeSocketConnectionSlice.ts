import { createSlice } from '@reduxjs/toolkit'

export const judgeSocketConnectionSlice = createSlice({
   name: 'judge',

   initialState: {
      isConnected: false,
   },

   reducers: {
      setIsConnected: (state, action) => {
         state.isConnected = action.payload
      }
   }
})

export const { setIsConnected } = judgeSocketConnectionSlice.actions

export default judgeSocketConnectionSlice.reducer