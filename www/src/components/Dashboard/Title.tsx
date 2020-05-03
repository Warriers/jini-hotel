import React from "react"
import Typography from "@material-ui/core/Typography"

interface Props {
  children: React.ReactNode
}

const Title = ({ children }: Props) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  )
}

export default Title
