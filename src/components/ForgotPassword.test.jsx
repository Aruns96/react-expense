import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import ForgotPassword from "./ForgotPassword";


test("render forgot pass",()=>{
    render(<ForgotPassword />)

    const buttonElement = screen.getByRole("button")
   userEvent.click(buttonElement)

    const element = screen.getByText("Send Link")
    expect(element).toBeInTheDocument()
})