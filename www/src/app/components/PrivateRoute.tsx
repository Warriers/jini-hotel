import React from "react"
import { navigate } from "gatsby"
import { useIdentityContext } from "plugins/gatsby-plugin-netlify-identity"
import { DashboardLayout as Layout } from "components"
import { MaybePathProps } from "../types"

const PrivateRoute = (
  props: React.PropsWithoutRef<
    MaybePathProps & {
      component: React.ComponentType<MaybePathProps>
      location: Location
      [prop: string]: any
    }
  >
) => {
  const { isLoggedIn } = useIdentityContext()
  const { component: Component, location, ...rest } = props

  React.useEffect(() => {
    if (!isLoggedIn && location.pathname !== `/app/login`) {
      // If the user is not logged in, redirect to the login page.
      navigate(`/app/login`)
    }
  }, [isLoggedIn, location])
  return isLoggedIn ? (
    <Layout>
      <Component {...rest} />
    </Layout>
  ) : null
}

export default PrivateRoute
