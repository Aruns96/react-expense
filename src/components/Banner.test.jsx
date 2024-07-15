import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Banner from "./Banner";

test("render expense tracker",()=>{
    render(<Banner />)
    const element = screen.getByText("Expense Tracker")
    expect(element).toBeInTheDocument()
})