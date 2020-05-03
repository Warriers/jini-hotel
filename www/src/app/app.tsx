import React from "react"
import { Router, Redirect } from "@reach/router"
import { MainLayout } from "components"
import Login from "./login"
import Signup from "./signup"
import Dashboard from "./dashboard"
import Checkout from "./checkout"
import PrivateRoute from "./components/PrivateRoute"
import { useIdentityContext } from "react-netlify-identity"
import { navigate } from "gatsby"

import { Routes } from "utils"

import { RedirectProps } from "./types"

const PublicRoute = (props) => {
  return props.children
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
      {isLoggedIn && (
        <Redirect
          from={`/app/${Routes.login}/`}
          to={`/app/${Routes.dashboard}/`}
          noThrow
        />
      )}
      {isLoggedIn && (
        <Redirect
          from={`/app/${Routes.signup}/`}
          to={`/app/${Routes.dashboard}/`}
          noThrow
        />
      )}

      <PublicRoute path="/app/">
        <PrivateRoute path={`${Routes.dashboard}/`} component={Dashboard} />
        <PrivateRoute path={`${Routes.checkout}/`} component={Checkout} />
        <Login path={Routes.login} layout={MainLayout} />
        <Signup path={Routes.signup} layout={MainLayout} />
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
