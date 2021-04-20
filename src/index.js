import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Dashboard from "views/Dashboard";
import Detail from "views/Detail";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/detail" component={Detail} exact />
    </Switch>
  </Router>,
  document.getElementById("root")
);
