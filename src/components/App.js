import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from './Add';
import Home from './Home';
import Edit from './Edit';
import Detail from './Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/detail/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
