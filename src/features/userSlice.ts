import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
   name: 'user',

   initialState: {
      user: "",
      email: ""
   },

   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },

      setEmail: (state, action) => {
         state.email = action.payload;
      }
   }
})

export const { setUser, setEmail } = userSlice.actions

export default userSlice.reducer