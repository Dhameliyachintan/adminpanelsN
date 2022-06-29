import logo from './logo.svg';
import './App.css';
import MiniDrawer from './Component/Layout/Layout';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Doctor from './Container/Doctor/Doctor';
import Medicine from './Container/Medicine';
import Appoinment from './Container/Appoinment';
import Product from './Container/Product';
import Doctorn from './Container/Doctorn';
import Doctort from './Container/Doctort';

function App() {
  return (
    <MiniDrawer>
      <Switch>
        <Route exact path={"/doctor"} component={Doctor} />
        <Route exact path={"/medicine"} component={Medicine} />
        <Route exact path={"/Appoinment"} component={Appoinment} />
        <Route exact path={"/Product"} component={Product} />
        <Route exact path={"/Doctort"} component={Doctort} />
        <Route exact path={"/doctorn"} component={Doctorn} />
      </Switch>
    </MiniDrawer>
  );
}


export default App;
