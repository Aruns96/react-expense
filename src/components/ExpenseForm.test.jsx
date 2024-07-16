import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import ExpenseForm from "./ExpenseForm";


test("render forgot pass",()=>{
    render(<ExpenseForm />)

    

    const element = screen.getByText("Food",{exact:false})
    expect(element).toBeInTheDocument()
})