import SignUp from './SignUp';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import PrivateRoute from './PrivateRoute';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (  
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  )
}

export default App;
