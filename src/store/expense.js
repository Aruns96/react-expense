import { createSlice } from "@reduxjs/toolkit";

const calculateTotalAmount = (expenses) => {
    return expenses.reduce((sum, expense) => sum + (expense.amount), 0);
  };
  
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
            state.expenses=(action.payload)
            state.totalAmount = calculateTotalAmount(state.expenses)
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
         
          
          editExpense(state,action){
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
              state.expenses[index] = action.payload;
              state.totalAmount = calculateTotalAmount(state.expenses);
              
            }
          },
          removeExpense(state,action){
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
            state.totalAmount = calculateTotalAmount(state.expenses);
          }
         
    }
   
    
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;