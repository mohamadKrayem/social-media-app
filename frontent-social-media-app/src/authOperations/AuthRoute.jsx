import React,{Component} from 'react'
import { Route, Navigate } from 'react-router-dom'
import { isAuthenticated, authenticate, deleteJWT } from './authStore'

const AuthRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ): (
        <Navigate replace to={'signin'}/>
      )
    )}/>
  )
}

export default AuthRoute