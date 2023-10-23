import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

// import publicRoute from './config/Routes';
import './App.scss';

import PublicRoute from './config/PublicRoute';
import AdminRoute from './config/AdminRoute';

import LoginPage from './layouts/pageLayout/LoginPage';
import RegisterPage from './layouts/pageLayout/RegisterPage';


function App() {

  return (

    <BrowserRouter>
      <Switch>

        <Route path='/login'>
          { 
            localStorage.getItem('auth_token') ? <Redirect to='/'/> : <LoginPage/>
          }
        </Route>
        <Route path='/register'>
          {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <RegisterPage/>}
        </Route>
        
        <AdminRoute path="/admin"  name= "Admin"/>

        <PublicRoute path="/" name="Home"/>



      </Switch>

    
    </BrowserRouter>
      
  );
}

export default App;
