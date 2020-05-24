import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./Header"
import { Navigator } from "./Navigator"
import { PostFeed } from "./pages/PostFeed"
import Profile from "./pages/Profile"
import PublicProfile from "./pages/PublicProfile"
import { ChatBar } from "./chat/ChatBar"

export const MainApp = () => {

  return (
    <div className="body">
        <Header />
        <div className="main-body">
          <Navigator />
          <div className="content-body">
            <Router>
              <Route path="/user/:username" component={PublicProfile} />
              <Route path="/profile" component={Profile} />
              <Route path="/feeds" component={PostFeed} />
            </Router>
          </div> 
          <ChatBar />
        </div>
    </div>
  )
}