import { createSlice } from "@reduxjs/toolkit";

  
const initalexpenseState = {
    expenses: [],
    amount: 0,
    description: "",
    category: "food",
    totalAmount :0
   }

const expenseSlice=createSlice({
    name:"expense",
    initialState:initalexpenseState,
    reducers:{
        addExpenses(state,action){
            
             state.expenses=[...state.expenses,action.payload]
             state.totalAmount=state.totalAmount+Number(action.payload[1].amount)
        },
        addDesc(state, action) {
          state.description = action.payload;
        },
        addCategory(state, action) {
          state.category = action.payload;
        },
        addAmount(state, action) {
            state.amount = action.payload;
          },
          setExpense(state,action){
            state.expenses=action.payload
            const total=state.expenses.reduce((acc,curr)=>acc+Number(curr[1].money),0)
            state.totalAmount=total
          },
          
          editExpense(state,action){
            const {payload}=action
            const duplicateIndex=state.expenses.findIndex(item=>item[0]===payload.id)
            state.totalAmount=state.totalAmount-Number(state.expenses[duplicateIndex][1].money)+Number(payload.money)
            state.expenses[duplicateIndex][1]={...payload}
          },
          removeExpense(state,action){
            const filterList=state.expenses.filter(item=>item[0]!==action.payload.id)
            state.expenses=filterList
            state.totalAmount=state.totalAmount-Number(action.payload.money)
          }
         
    }
   
    
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;