import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import PermanentDrawerLeft from "../src/PermanentDrawerLeft";

export default function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"><PermanentDrawerLeft page="Manage"></PermanentDrawerLeft></Route>
          <Route exact path="/create" ><PermanentDrawerLeft page="Create"></PermanentDrawerLeft></Route>
          <Route exact path="/edit/:editId" ><PermanentDrawerLeft page="Edit"></PermanentDrawerLeft></Route>
          <Route exact path="/daily"><PermanentDrawerLeft page="Daily"></PermanentDrawerLeft></Route>
          <Route exact path="/statistics"><PermanentDrawerLeft page="Statistics"></PermanentDrawerLeft></Route>
        </Switch>
      </Router>
    </div>
  );
}