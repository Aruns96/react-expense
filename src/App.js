import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const isLogin = localStorage.getItem("token");
  let url;
  if (isLogin === null) {
    url = "/signup";
  } else {
    url = "/login";
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to={url} />
      </Route>
      <Route path="/signup">
        <SignupPage />
      </Route>

      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/welcome">
        <WelcomePage />
      </Route>
      <Route path="/completeprofile">
        <CompleteProfilePage />
      </Route>
      <Route path="/forgotpassword">
        <ForgotPasswordPage />
      </Route>
    </Switch>
  );
}

export default App;
