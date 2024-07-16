import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Welcome from "./Welcome";

test("render expense tracker",()=>{
    render(<Welcome />)
    const element = screen.getByText("Welcome to Expense Tracker",{exact:false})
    expect(element).toBeInTheDocument()
})