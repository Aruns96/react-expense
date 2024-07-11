import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import ExpenseReducer from "./expense"
import ThemeReducer from "./theme"



const store = configureStore({
    reducer :{auth:AuthReducer,expense:ExpenseReducer,theme:ThemeReducer}
})


export default store;