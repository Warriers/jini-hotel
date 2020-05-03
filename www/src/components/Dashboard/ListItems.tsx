import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PersonIcon from "@material-ui/icons/Person"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ChatIcon from '@material-ui/icons/Chat';
import RoomIcon from '@material-ui/icons/Room';
import AssignmentIcon from "@material-ui/icons/Assignment"

import { Routes } from "utils"
import { navigate } from "gatsby"

function ListItemLink(props) {
  const { to = "dashboard" } = props
  return (
    <ListItem
      onClick={(e) => {
        e.preventDefault()
        navigate(`/app/${to}/`)
      }}
      button
      {...props}
    />
  )
}

export const mainListItems = (
  <div>
    <ListItemLink to={Routes.dashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemLink>
    <ListItemLink to={Routes.checkout}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Checkout" />
    </ListItemLink>
    <ListItemLink button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemLink>
    <ListItemLink button>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItemLink>
    <ListItemLink button>
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItemLink>
  </div>
)

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItemLink button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemLink>
    <ListItemLink button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemLink>
    <ListItemLink button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemLink>
  </div>
)
