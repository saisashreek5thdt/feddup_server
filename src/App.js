import './App.css';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import $ from "jquery";
import {Home, Signin, Signout, Register, Dashboard, Adminlogin, Admindashboard, Forgotpassword, Resetpassword, Error} from './pages';
import AdminFeedBack from "./pages/AdminFeedBack"
function App() {
  return (
    <Switch>
      <Route path="/signin" component={Signin} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/signout" component={Signout} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/adminlogin" component={Adminlogin} exact />
      <Route path="/adminFeedBack" component={AdminFeedBack} exact />
      <Route path="/admindashboard" component={Admindashboard} exact />
      <Route path="/forgotpassword" component={Forgotpassword} exact />
      <Route path="/resetpassword/:token" component={Resetpassword} exact />
      <Route path="/" component={Home} exact render={() => <Redirect to="/home" />} />
      <Route path="/error" component={Error} exact/>
      <Redirect to="/error" />
    </Switch>
  );
}

export default withRouter(App);
