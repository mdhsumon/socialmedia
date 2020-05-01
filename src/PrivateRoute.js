import React from "react"
import { Redirect, Route } from "react-router-dom"
import { isLoggedIn } from "./commonActions"
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render = { routeProps => {
        return isLoggedIn() ? <Component {...routeProps} /> : <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
      }}
    />
  )
}
