import React from "react"
import { Router, Redirect } from "@reach/router"
import { MainLayout as Layout, DashboardLayout as Dashboard } from "components"
import Login from "./login"
import Signup from "./signup"
import Main from "./main"
import PrivateRoute from "./components/PrivateRoute"
import { useIdentityContext } from "react-netlify-identity"
import { navigate } from "gatsby"

import { Routes } from "utils"

import { RedirectProps } from "./types"

const PublicRoute = (props) => {
  return <Layout>{props.children}</Layout>
}

const App = () => {
  const { isLoggedIn } = useIdentityContext()
  console.log(isLoggedIn)
  return (
    <Router>
      <Redirect
        from={`/app/`}
        to={`/app/${isLoggedIn ? Routes.dashboard : Routes.login}/`}
        noThrow
      />
      <PrivateRoute path={`/app/${Routes.dashboard}/`} component={Dashboard} />
      <PublicRoute path="/app/">
        {/* <PrivateRoute path="/" component={Login} /> */}
        {/* <Redirect from="/" to="/app/dashboard" /> */}
        <Login path={Routes.login} />
        <Signup path={Routes.signup} />
        <Redirect from="/app/*" to="/404/" default noThrow />
      </PublicRoute>
    </Router>
  )
}

const NotFound = () => {
  navigate("/404")
  return null
}

// const Redirect = ({from, to}: RedirectProps) => {
//   navigate(to);
//   return null;
// }

export default App
