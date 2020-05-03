import React from "react";
import { Router } from "@reach/router";
import { Layout } from "components";
import Login from "./login";
import PrivateRoute from "./components/PrivateRoute";

const PublicRoute = (props) => {
  return <div>{props.children}</div>;
};

const App = () => {
  return (
    <Layout>
      <Router>
        {/* <PrivateRoute path="/app/profile" component={Profile} /> */}
        <PublicRoute path="/app">
          {/* <PrivateRoute path="/" component={Main} /> */}
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  );
};

export default App;
