import React from "react"
import { Redirect, Route } from "react-router-dom"
import { isLoggedIn } from "./commonActions"

export const PrivateRoute = ({ component: Component, ...rest }) => {

  const loggedStatus = isLoggedIn()

  return (
    <Route
      {...rest} render={props => loggedStatus ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
    />
  )
}
