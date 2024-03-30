import { configureStore, combineReducers, Store  } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice';
import judgeSocketConnectionReducer from '../features/judgeSocketConnectionSlice';

const rootReducer = combineReducers({
   users: userReducer,
   judge: judgeSocketConnectionReducer,
});

const store:Store = configureStore({
   reducer: rootReducer,
})

export default store;