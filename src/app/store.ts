import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice';
import judgeSocketConnectionReducer from '../features/judgeSocketConnectionSlice';

const rootReducer = combineReducers({
   users: userReducer,
   judge: judgeSocketConnectionReducer,
 });

export default configureStore({
   reducer: rootReducer
})