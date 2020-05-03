import React from "react"
import { Router, Redirect } from "@reach/router"
import { MainLayout as Layout } from "components"
import Login from "./login"
import Signup from "./signup"
import Main from "./main"
import PrivateRoute from "./components/PrivateRoute"
import { useIdentityContext } from "react-netlify-identity"
import { navigate } from "gatsby"

import {RedirectProps} from "./types"

const PublicRoute = (props) => {
  return props.children
}

const App = () => {
  const { isLoggedIn } = useIdentityContext()
  console.log(isLoggedIn)
  return (
    <Layout>
      <Router>
        <Redirect
          from="/app"
          to={`/app/${isLoggedIn ? "dashboard" : "login"}`}
          noThrow
        />
        {/* <PrivateRoute path="/app/profile" component={Profile} /> */}
        {/* <PublicRoute path="/app"> */}
          {/* <PrivateRoute path="/" component={Login} /> */}
          {/* <Redirect from="/" to="/app/dashboard" /> */}
          <Login path="/app/login" />
          <Signup path="/app/signup" />
          <Redirect from="/app/*" to="/404" default noThrow />
        {/* </PublicRoute> */}
      </Router>
    </Layout>
  )
}

const NotFound = () => {
  navigate("/404")
  return null;
}

// const Redirect = ({from, to}: RedirectProps) => {
//   navigate(to);
//   return null;
// }

export default App
