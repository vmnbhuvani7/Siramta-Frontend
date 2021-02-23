import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import { routes } from './routes';
import './App.css';

const App = () => {
  return(
    <div>
     <Router>
       <Switch>
           {routes.map((route, idx) => {
             return route.component ? (
               <Route
                 key={idx}
                 path={route.path}
                 exact={route.exact}
                 render={props => (
                   <>
                     <route.component {...props} />
                   </>
                 )} />
             ) : null;
           })}
       </Switch>
     </Router>
    </div>
  )
}


export default App;
