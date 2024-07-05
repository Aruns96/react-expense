

import { Route,Switch,Redirect } from 'react-router-dom';
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import WelcomePage from './pages/WelcomePage';
import CompleteProfilePage from './pages/CompleteProfilePage';

function App() {
  return (
    <Switch>
    <Route path="/" exact>
      <Redirect to="/signup" />
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
    </Switch>
  );
}

export default App;
