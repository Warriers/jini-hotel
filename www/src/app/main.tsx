import React from "react"
import { useIdentityContext } from "react-netlify-identity"
import { MaybePathProps } from "./types"

const Main = ({}: MaybePathProps) => {
  const { isLoggedIn } = useIdentityContext()
  return <h1>s</h1>
}

export default Main