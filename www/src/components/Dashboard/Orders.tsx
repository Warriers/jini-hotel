import React from "react"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Title from "./Title"

// Generate Order Data
const createData = (id, date, name, paymentMethod, amount) => {
  return { id, date, name, paymentMethod, amount }
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Pizza",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Elvis Presley",
    "Burger",
    312.44
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Elvis Presley",
    "Idli",
    312.44
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Elvis Presley",
    "Vada",
    312.44
  ),
]

const preventDefault = (event) => {
  event.preventDefault()
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

const Orders = () => {
  const classes = useStyles()
  return (
    <>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </>
  )
}

export default Orders
