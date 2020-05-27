import React, { Component, useState } from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
// import styles from "./styles/map.module.css"
// import {Helmet} from "react-helmet"
// import Container from "@material-ui/core/Container"
import { Container } from "@material-ui/core"

type State = {
  lat: number
  lng: number
  zoom: number
}

const useStyles = makeStyles({
  root: {
    // "&.map": {
    //   backgroundColor: "blue",
    // },
    "& .leaflet-container": {
      height: "75vh",
    },
  },
})

const createCity = (name, lat, lng, zIndex) => {
    return {name, lat, lng, zIndex}
}

export default function SimpleMap() {
  const classes = useStyles()
  //   console.log(styles)
  const cities = [
      createCity('Bangalore', 12.9716, 77.6624468, 1),
      createCity('Hyderabad', 17.4123487, 78.4080455, 2),
      createCity('Pune', 18.5246164, 73.8629674, 3),
      createCity('Tamil Nadu',11.059821, 78.387451, 4),
      createCity('Kerala', 10.850516, 76.271080, 5),
  ]
  const position = [cities[0].lat, cities[0].lng]
  if (typeof window !== "undefined") {
    return (
      <Container className={clsx(classes.root)}>
        <Map center={position} zoom={5}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city, key) => {
              const position = [city.lat, city.lng]
            return (
              <Marker key={key} position={position} zIndexOffset={city.zIndex}>
                <Popup>
                  {city.name}
                </Popup>
              </Marker>
            )
          })}
        </Map>
      </Container>
    )
  }
  console.log("test")
  return <h1>s</h1>
}
